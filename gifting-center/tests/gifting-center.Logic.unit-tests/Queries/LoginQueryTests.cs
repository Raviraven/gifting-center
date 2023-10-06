using gifting_center.Data.Database.Models;
using gifting_center.Data.Repositories.Interfaces;
using gifting_center.Data.ViewModels.Auth;
using gifting_center.Logic.Auth;
using gifting_center.Logic.Identity;
using gifting_center.Logic.Queries;
using gifting_center.unit_tests.Utils.Builders.DatabaseEntities;

namespace gifting_center.Logic.unit_tests.Queries;

public class LoginQueryTests
{
    private readonly IUserRepository _userRepository;
    private readonly IJwtProvider _jwtProvider;
    private readonly ICryptoProvider _cryptoProvider;
    private readonly IRefreshTokenUtils _refreshTokenUtils;

    private readonly LoginQueryHandler _sut;
    
    public LoginQueryTests()
    {
        _userRepository = Substitute.For<IUserRepository>();
        _jwtProvider = Substitute.For<IJwtProvider>();
        _cryptoProvider = Substitute.For<ICryptoProvider>();
        _refreshTokenUtils = Substitute.For<IRefreshTokenUtils>();

        _sut = new LoginQueryHandler(_userRepository, _jwtProvider, _cryptoProvider, _refreshTokenUtils);
    }

    [Fact]
    public async void login_should_return_token_response()
    {
        var loginResult = LoginResponse.Create("test.generated.token", "generated-refresh-token");
        const string password = "q";
        const string passwordHash = "qHashed";

        var userDb = new UserEntityBuilder()
            .WithPassword(passwordHash)
            .WithRoles(new List<UserRoleEntity>() { new() { Id = -9, Name = Permissions.UserRole.User } })
            .Build();


        var loginRequest = new LoginQuery(userDb.Email, password);

        _userRepository.GetByEmail(loginRequest.Email).Returns(userDb);
        _cryptoProvider.VerifyPassword(password, passwordHash).Returns(true);
        _jwtProvider.Generate(Arg.Is<User>(u =>
                u.Email == userDb.Email && u.Username == userDb.Username && u.Id == userDb.Id &&
                u.Roles.Contains(Permissions.UserRole.User)))
            .Returns("test.generated.token");
        _refreshTokenUtils.Generate()
            .Returns(new RefreshToken("generated-refresh-token", DateTime.UtcNow, DateTime.UtcNow, null));

        var result = await _sut.Handle(loginRequest, CancellationToken.None);

        result.Should().BeEquivalentTo(loginResult);
    }

    [Fact]
    public async void login_should_update_refresh_token()
    {
        // update token
        // save changes into db
        var loginResult = LoginResponse.Create("test.generated.token", "generated-refresh-token");
        const string password = "q";
        const string passwordHash = "qHashed";
        var now = DateTime.UtcNow;

        var userDb = new UserEntityBuilder()
            .WithPassword(passwordHash)
            .WithRoles(new List<UserRoleEntity>() { new() { Id = -9, Name = Permissions.UserRole.User } })
            .Build();


        var loginRequest = new LoginQuery(userDb.Email, password);

        _userRepository.GetByEmail(loginRequest.Email).Returns(userDb);
        _cryptoProvider.VerifyPassword(password, passwordHash).Returns(true);
        _jwtProvider.Generate(Arg.Is<User>(u =>
                u.Email == userDb.Email && u.Username == userDb.Username && u.Id == userDb.Id &&
                u.Roles.Contains(Permissions.UserRole.User)))
            .Returns("test.generated.token");
        _refreshTokenUtils.Generate()
            .Returns(new RefreshToken("generated-refresh-token", now, now, null));

        await _sut.Handle(loginRequest, CancellationToken.None);

        userDb.RefreshToken.Should()
            .BeEquivalentTo(RefreshTokenEntity.Create("generated-refresh-token", now, now, null));
        await _userRepository.Received(1).SaveChanges();
    }

    [Fact]
    public async void login_should_return_empty_string_when_wrong_password()
    {
        const string password = "q";
        const string passwordHash = "qHashed";
        
        var userDb = new UserEntityBuilder()
            .WithPassword(passwordHash)
            .Build();

        var loginRequest = new LoginQuery(userDb.Email, password);

        _userRepository.GetByEmail(loginRequest.Email).Returns(userDb);
        _cryptoProvider.VerifyPassword(password, passwordHash).Returns(false);

        var result = await _sut.Handle(loginRequest, CancellationToken.None);

        result.Should().BeEquivalentTo(LoginResponse.Create(string.Empty, string.Empty));
    }
}