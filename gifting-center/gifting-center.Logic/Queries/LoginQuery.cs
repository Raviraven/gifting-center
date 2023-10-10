using gifting_center.Data.Database.Models;
using gifting_center.Data.Repositories.Interfaces;
using gifting_center.Data.ViewModels.Auth;
using gifting_center.Logic.Auth;
using MediatR;

namespace gifting_center.Logic.Queries;

public class LoginQuery : IRequest<LoginResponse>
{
    public string Email { get; }

    public string Password { get; }

    public LoginQuery(string email, string password)
    {
        Email = email;
        Password = password;
    }
}

public class LoginQueryHandler
(IUserRepository userRepository, IJwtProvider jwtProvider,
    ICryptoProvider cryptoProvider, IRefreshTokenUtils refreshTokenUtils) : IRequestHandler<LoginQuery, LoginResponse>
{
    public async Task<LoginResponse> Handle(LoginQuery query, CancellationToken cancellationToken)
    {
        var user = await userRepository.GetByEmail(query.Email);
        if (user is not null && cryptoProvider.VerifyPassword(query.Password, user.PasswordHash))
        {
            var accessToken = jwtProvider.Generate(User.Create(user));
            var refreshToken = refreshTokenUtils.Generate();

            user.AddNewRefreshToken(RefreshTokenEntity.Create(
                refreshToken.Token, refreshToken.Expires, refreshToken.Created, refreshToken.Revoked));
            
            await userRepository.SaveChanges();

            return LoginResponse.Create(accessToken, refreshToken.Token);
        }

        return LoginResponse.Create(string.Empty, string.Empty);
    }
}