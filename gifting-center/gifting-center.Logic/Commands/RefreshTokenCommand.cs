using gifting_center.Data.Database.Models;
using gifting_center.Data.Repositories.Interfaces;
using gifting_center.Data.ViewModels.Auth;
using gifting_center.Logic.Auth;
using MediatR;

namespace gifting_center.Logic.Commands;

public class RefreshTokenCommand : IRequest<LoginResponse>
{
    public string? RefreshToken { get; private set; }

    public RefreshTokenCommand(string? refreshToken)
    {
        this.RefreshToken = refreshToken;
    }
}

public class RefreshTokenCommandHandler(IUserRepository userRepository, IJwtProvider jwtProvider,
    IRefreshTokenUtils refreshTokenUtils,
    IDateTimeProvider dateTimeProvider) : IRequestHandler<RefreshTokenCommand, LoginResponse>
{
    public async Task<LoginResponse> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
    {
        var user = await userRepository.GetByRefreshToken(request.RefreshToken);
        var currentRefreshToken = user?.RefreshTokens.First(n => n.Token == request.RefreshToken);

        if (user is null || currentRefreshToken is not null &&
            (currentRefreshToken.Expires <= dateTimeProvider.UtcNow || currentRefreshToken.Revoked is not null))
        {
            return LoginResponse.Create(string.Empty, string.Empty);
        }

        var jwt = jwtProvider.Generate(User.Create(user));
        var refreshToken = refreshTokenUtils.Generate();

        currentRefreshToken!.Revoke(dateTimeProvider.UtcNow);
        user.AddNewRefreshToken(RefreshTokenEntity.Create(
            refreshToken.Token, refreshToken.Expires, refreshToken.Created, refreshToken.Revoked));

        await userRepository.SaveChanges();

        return LoginResponse.Create(jwt, refreshToken.Token);
    }
}