using gifting_center.Data.Repositories.Interfaces;
using gifting_center.Logic.Auth;
using gifting_center.Logic.Entities;
using gifting_center.Logic.ViewModels.Auth;
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

public class LoginQueryHandler : IRequestHandler<LoginQuery, LoginResponse>
{
    private readonly IUserRepository _userRepository;
    private readonly IJwtProvider _jwtProvider;
    private readonly ICryptoProvider _cryptoProvider;
    private readonly IRefreshTokenUtils _refreshTokenUtils;


    public LoginQueryHandler(IUserRepository userRepository, IJwtProvider jwtProvider, ICryptoProvider cryptoProvider,
        IRefreshTokenUtils refreshTokenUtils)
    {
        _userRepository = userRepository;
        _jwtProvider = jwtProvider;
        _cryptoProvider = cryptoProvider;
        _refreshTokenUtils = refreshTokenUtils;
    }

    public async Task<LoginResponse> Handle(LoginQuery query, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetByEmail(query.Email);
        if (user is not null && _cryptoProvider.VerifyPassword(query.Password, user.PasswordHash))
        {
            var accessToken = _jwtProvider.Generate(User.Create(user));
            var refreshToken = _refreshTokenUtils.Generate();

            user.AddNewRefreshToken(RefreshTokenEntity.Create(
                refreshToken.Token, refreshToken.Expires, refreshToken.Created, refreshToken.Revoked));

            await _userRepository.SaveChanges();

            return LoginResponse.Create(accessToken, refreshToken.Token);
        }

        return LoginResponse.Create(string.Empty, string.Empty);
    }
}