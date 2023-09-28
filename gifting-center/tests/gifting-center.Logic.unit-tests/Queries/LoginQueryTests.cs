using gifting_center.Data.Database.Models;
using gifting_center.Data.Repositories.Interfaces;
using gifting_center.Data.ViewModels.Auth;
using gifting_center.Logic.Auth;
using gifting_center.Logic.Queries;

namespace gifting_center.Logic.unit_tests.Queries;

public class LoginQueryTests
{
    private readonly IUserRepository _userRepository;
    private readonly IJwtProvider _jwtProvider;
    private readonly ICryptoProvider _cryptoProvider;

    private readonly LoginQueryHandler _sut;

    public LoginQueryTests()
    {
        _userRepository = Substitute.For<IUserRepository>();
        _jwtProvider = Substitute.For<IJwtProvider>();
        _cryptoProvider = Substitute.For<ICryptoProvider>();

        _sut = new LoginQueryHandler(_userRepository, _jwtProvider, _cryptoProvider);
    }

    [Fact]
    public async void login_should_return_token()
    {
        const string generatedToken = "test.generated.token";
        const string password = "q";
        const string passwordHash = "qHashed";

        var userDb = new UserDb()
        {
            Email = "test@email.com",
            PasswordHash = passwordHash
        };

        var loginRequest = new LoginQuery(userDb.Email, password);

        _userRepository.GetByEmail(loginRequest.Email).Returns(userDb);
        _cryptoProvider.VerifyPassword(password, passwordHash).Returns(true);
        _jwtProvider.Generate(Arg.Is<User>(u =>
            u.Email == userDb.Email && u.Username == userDb.Username && u.Id == userDb.Id)).Returns(generatedToken);
        
        var result = await _sut.Handle(loginRequest, CancellationToken.None);

        result.Should().Be(generatedToken);
    }

    [Fact]
    public async void login_should_return_empty_string_when_wrong_password()
    {
        const string password = "q";
        const string passwordHash = "qHashed";

        var userDb = new UserDb()
        {
            Email = "test@email.com",
            PasswordHash = passwordHash
        };

        var loginRequest = new LoginQuery(userDb.Email, password);

        _userRepository.GetByEmail(loginRequest.Email).Returns(userDb);
        _cryptoProvider.VerifyPassword(password, passwordHash).Returns(false);

        var result = await _sut.Handle(loginRequest, CancellationToken.None);

        result.Should().Be(string.Empty);
    }
}