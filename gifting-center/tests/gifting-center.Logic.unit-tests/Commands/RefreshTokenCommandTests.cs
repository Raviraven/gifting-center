using gifting_center.Domain;
using gifting_center.Domain.Auth;
using gifting_center.Domain.Commands;
using gifting_center.Domain.Entities;
using gifting_center.Domain.Repositories;
using gifting_center.Domain.ViewModels.Auth;
using gifting_center.unit_tests.Utils.Builders.DatabaseEntities;

namespace gifting_center.Logic.unit_tests.Commands;

public class RefreshTokenCommandTests
{
    private readonly IUserRepository _userRepository;
    private readonly IJwtProvider _jwtProvider;
    private readonly IRefreshTokenUtils _refreshTokenUtils;
    private readonly IDateTimeProvider _dateTimeProvider;

    private readonly RefreshTokenCommandHandler _sut;
    
    private static readonly DateTime UtcNow = DateTime.UtcNow;

    public RefreshTokenCommandTests()
    {
        _userRepository = Substitute.For<IUserRepository>();
        _jwtProvider = Substitute.For<IJwtProvider>();
        _refreshTokenUtils = Substitute.For<IRefreshTokenUtils>();
        _dateTimeProvider = Substitute.For<IDateTimeProvider>();

        _sut = new RefreshTokenCommandHandler(_userRepository, _jwtProvider, _refreshTokenUtils, _dateTimeProvider);
    }

    public static IEnumerable<object?[]> InvalidData = new List<object?[]>
    {
        new object?[] { null },
        new object?[]
        {
            new UserEntityBuilder().WithRefreshToken(
                new RefreshTokenEntityBuilder()
                    .WithToken("test-refresh-token")
                    .WithExpires(UtcNow.AddHours(-1))
                    .Build())
                .Build()
        },
        new object?[]
        {
            new UserEntityBuilder().WithRefreshToken(
                new RefreshTokenEntityBuilder()
                    .WithToken("test-refresh-token")
                    .WithExpires(UtcNow.AddHours(1))
                    .WithRevoked(DateTime.UtcNow)
                    .Build())
                .Build()
        },
    };

    [Theory]
    [MemberData(nameof(InvalidData))]
    public async void should_return_empty_tokens_when_invalid_data(UserEntity user)
    {
        const string refreshToken = "test-refresh-token";

        _userRepository.GetByRefreshToken(refreshToken).Returns(user);
        _dateTimeProvider.UtcNow.Returns(UtcNow);

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
    public async void should_revoke_current_refresh_token_and_add_new_one()
    {
        const string refreshToken = "test-token";
        var tokenEntity = new RefreshTokenEntityBuilder()
            .WithToken(refreshToken)
            .WithExpires(UtcNow.AddHours(1))
            .Build();

        var user = new UserEntityBuilder()
            .WithRefreshToken(tokenEntity)
            .Build();

        var newRefreshToken = new RefreshToken(
            "new-refresh-token", UtcNow.AddHours(1), DateTime.UtcNow, null);

        _userRepository.GetByRefreshToken(refreshToken).Returns(user);
        _jwtProvider.Generate(Arg.Is<User>(
            n => n.Email == user.Email &&
                 n.Id == user.Id)).Returns("jwt-token");
        _refreshTokenUtils.Generate().Returns(newRefreshToken);
        _dateTimeProvider.UtcNow.Returns(UtcNow);

        var result = await _sut.Handle(new RefreshTokenCommand(refreshToken), CancellationToken.None);

        
        // then
        tokenEntity.Revoked.Should().Be(UtcNow);
        
        user.RefreshTokens.Should().ContainEquivalentOf(new RefreshTokenEntity()
        {
            Token = newRefreshToken.Token,
            Created = newRefreshToken.Created,
            Expires = newRefreshToken.Expires,
            Revoked = newRefreshToken.Revoked
        });
        
        await _userRepository.Received(1).SaveChanges();
    }
}