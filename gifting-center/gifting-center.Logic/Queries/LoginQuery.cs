using gifting_center.Data.Repositories.Interfaces;
using gifting_center.Data.ViewModels.Auth;
using gifting_center.Logic.Auth;
using MediatR;

namespace gifting_center.Logic.Queries;

public class LoginQuery : IRequest<string>
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
    ICryptoProvider cryptoProvider) : IRequestHandler<LoginQuery, string>
{
    public async Task<string> Handle(LoginQuery query, CancellationToken cancellationToken)
    {
        var user = await userRepository.GetByEmail(query.Email);
        if (user is not null && cryptoProvider.VerifyPassword(query.Password, user.PasswordHash))
        {
            // return JWT
            return jwtProvider.Generate(User.Create(user));

            // generate refresh token
        }

        return string.Empty;
    }
}