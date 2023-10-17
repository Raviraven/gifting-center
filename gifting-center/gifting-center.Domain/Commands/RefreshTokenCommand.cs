using gifting_center.Domain.Auth;
using gifting_center.Domain.Entities;
using gifting_center.Domain.Repositories;
using gifting_center.Domain.ViewModels.Auth;
using MediatR;

namespace gifting_center.Domain.Commands;

public class RefreshTokenCommand : IRequest<LoginResponse>
{
    public string? RefreshToken { get; private set; }

    public RefreshTokenCommand(string? refreshToken)
    {
        this.RefreshToken = refreshToken;
    }
}

public class RefreshTokenCommandHandler : IRequestHandler<RefreshTokenCommand, LoginResponse>
{
    private readonly IUserRepository _userRepository;
    private readonly IJwtProvider _jwtProvider;
    private readonly IRefreshTokenUtils _refreshTokenUtils;
    private readonly IDateTimeProvider _dateTimeProvider;


    public RefreshTokenCommandHandler(IUserRepository userRepository, IJwtProvider jwtProvider, IRefreshTokenUtils refreshTokenUtils, IDateTimeProvider dateTimeProvider)
    {
        _userRepository = userRepository;
        _jwtProvider = jwtProvider;
        _refreshTokenUtils = refreshTokenUtils;
        _dateTimeProvider = dateTimeProvider;
    }

    public async Task<LoginResponse> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetByRefreshToken(request.RefreshToken);
        var currentRefreshToken = user?.RefreshTokens.First(n => n.Token == request.RefreshToken);

        if (user is null || currentRefreshToken is not null &&
            (currentRefreshToken.Expires <= _dateTimeProvider.UtcNow || currentRefreshToken.Revoked is not null))
        {
            return LoginResponse.Create(string.Empty, string.Empty);
        }

        var jwt = _jwtProvider.Generate(User.Create(user));
        var refreshToken = _refreshTokenUtils.Generate();

        currentRefreshToken!.Revoke(_dateTimeProvider.UtcNow);
        user.AddNewRefreshToken(RefreshTokenEntity.Create(
            refreshToken.Token, refreshToken.Expires, refreshToken.Created, refreshToken.Revoked));

        await _userRepository.SaveChanges();

        return LoginResponse.Create(jwt, refreshToken.Token);
    }
}