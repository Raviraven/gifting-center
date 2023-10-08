using gifting_center.Data.Database.Models;
using gifting_center.Data.Repositories.Interfaces;
using gifting_center.Data.ViewModels.Auth;
using gifting_center.Logic.Auth;
using gifting_center.Logic.Commands;
using gifting_center.unit_tests.Utils.Builders.DatabaseEntities;

namespace gifting_center.Logic.unit_tests.Commands;

public class RefreshTokenCommandTests
{
    private readonly IUserRepository _userRepository;
    private readonly IJwtProvider _jwtProvider;
    private readonly IRefreshTokenUtils _refreshTokenUtils;

    private readonly RefreshTokenCommandHandler _sut;

    public RefreshTokenCommandTests()
    {
        _userRepository = Substitute.For<IUserRepository>();
        _jwtProvider = Substitute.For<IJwtProvider>();
        _refreshTokenUtils = Substitute.For<IRefreshTokenUtils>();

        _sut = new RefreshTokenCommandHandler(_userRepository, _jwtProvider, _refreshTokenUtils);
    }

    public static IEnumerable<object?[]> InvalidData = new List<object?[]>
    {
        new object?[] { null },
        new object?[]
        {
            new UserEntityBuilder().WithRefreshToken(
                new RefreshTokenEntityBuilder().WithExpires(DateTime.UtcNow.AddHours(-1)).Build()).Build()
        },
        new object?[]
        {
            new UserEntityBuilder().WithRefreshToken(
                new RefreshTokenEntityBuilder().WithExpires(DateTime.UtcNow.AddHours(1))
                    .WithRevoked(DateTime.UtcNow).Build()).Build()
        },
    };

    [Theory]
    [MemberData(nameof(InvalidData))]
    public async void should_return_empty_tokens_when_invalid_data(UserEntity user)
    {
        const string refreshToken = "test-refresh-token";

        _userRepository.GetByRefreshToken(refreshToken).Returns(user);

        var result = await _sut.Handle(new RefreshTokenCommand(refreshToken), CancellationToken.None);

        result.AccessToken.Should().BeEmpty();
        result.RefreshToken.Should().BeEmpty();
    }

    [Fact]
    public async void should_return_jwt_and_refresh_token()
    {
        const string refreshToken = "test-token";
        var tokenEntity = new RefreshTokenEntityBuilder()
            .WithToken(refreshToken)
            .WithExpires(DateTime.UtcNow.AddHours(1))
            .Build();

        var user = new UserEntityBuilder()
            .WithRefreshToken(tokenEntity)
            .Build();

        _userRepository.GetByRefreshToken(refreshToken).Returns(user);
        _jwtProvider.Generate(Arg.Is<User>(
            n => n.Email == user.Email &&
                 n.Id == user.Id)).Returns("jwt-token");
        _refreshTokenUtils.Generate().Returns(new RefreshToken(
            "new-refresh-token", DateTime.UtcNow.AddHours(1), DateTime.UtcNow, null));

        var result = await _sut.Handle(new RefreshTokenCommand(refreshToken), CancellationToken.None);

        result.AccessToken.Should().Be("jwt-token");
        result.RefreshToken.Should().Be("new-refresh-token");
    }

    [Fact]
    public async void should_update_user_with_new_token()
    {
        const string refreshToken = "test-token";
        var tokenEntity = new RefreshTokenEntityBuilder()
            .WithToken(refreshToken)
            .WithExpires(DateTime.UtcNow.AddHours(1))
            .Build();

        var user = new UserEntityBuilder()
            .WithRefreshToken(tokenEntity)
            .Build();

        var newRefreshToken = new RefreshToken(
            "new-refresh-token", DateTime.UtcNow.AddHours(1), DateTime.UtcNow, null);

        _userRepository.GetByRefreshToken(refreshToken).Returns(user);
        _jwtProvider.Generate(Arg.Is<User>(
            n => n.Email == user.Email &&
                 n.Id == user.Id)).Returns("jwt-token");
        _refreshTokenUtils.Generate().Returns(newRefreshToken);

        var result = await _sut.Handle(new RefreshTokenCommand(refreshToken), CancellationToken.None);

        user.RefreshToken.Should().BeEquivalentTo(newRefreshToken);
        await _userRepository.Received(1).SaveChanges();
    }
}