using gifting_center.Data.Database.Models;
using gifting_center.Data.Repositories.Interfaces;
using gifting_center.Data.ViewModels.Auth;
using gifting_center.Logic.Auth;

namespace gifting_center.Logic.unit_tests.Services;

public class AuthServiceTests
{
    private readonly Mock<IUserRepository> _userRepository;
    private readonly Mock<IJwtProvider> _jwtProvider;
    private readonly Mock<ICryptoProvider> _cryptoProvider;

    private AuthService sut;

    public AuthServiceTests()
    {
        _userRepository = new Mock<IUserRepository>();
        _jwtProvider = new Mock<IJwtProvider>();
        _cryptoProvider = new Mock<ICryptoProvider>();

        sut = new AuthService(_userRepository.Object, _jwtProvider.Object, _cryptoProvider.Object);
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

        var loginRequest = new LoginRequest(userDb.Email, password);

        _userRepository.Setup(n => n.GetByEmail(loginRequest.Email)).ReturnsAsync(userDb);
        _cryptoProvider.Setup(n => n.VerifyPassword(password, passwordHash)).Returns(true);
        _jwtProvider
            .Setup(n => n.Generate(It.Is<User>(u =>
                u.Email == userDb.Email && u.Username == userDb.Username && u.Id == userDb.Id)))
            .Returns(generatedToken);

        var result = await sut.Login(loginRequest);

        result.Should().Be(generatedToken);
    }

    [Fact]
    public async void login_should_return_empty_string_when_wrong_password()
    {
        const string generatedToken = "test.generated.token";
        const string password = "q";
        const string passwordHash = "qHashed";

        var userDb = new UserDb()
        {
            Email = "test@email.com",
            PasswordHash = passwordHash
        };

        var loginRequest = new LoginRequest(userDb.Email, password);

        _userRepository.Setup(n => n.GetByEmail(loginRequest.Email)).ReturnsAsync(userDb);
        _cryptoProvider.Setup(n => n.VerifyPassword(password, passwordHash)).Returns(false);
       
        var result = await sut.Login(loginRequest);

        result.Should().Be(string.Empty);
    }
}