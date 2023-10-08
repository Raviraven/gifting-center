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
    IRefreshTokenUtils refreshTokenUtils) : IRequestHandler<RefreshTokenCommand, LoginResponse>
{
    public async Task<LoginResponse> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
    {
        var user = await userRepository.GetByRefreshToken(request.RefreshToken);

        // TODO: change to datetime provider
        if (user is null || user.RefreshToken!.Expires <= DateTime.UtcNow || user.RefreshToken.Revoked is not null)
        {
            return LoginResponse.Create(string.Empty, string.Empty);
        }

        var jwt = jwtProvider.Generate(User.Create(user));
        var refreshToken = refreshTokenUtils.Generate();
        
        user.UpdateRefreshToken(RefreshTokenEntity.Create(
            refreshToken.Token, refreshToken.Expires, refreshToken.Created, refreshToken.Revoked));
        await userRepository.SaveChanges();

        return LoginResponse.Create(jwt, refreshToken.Token);
    }
}