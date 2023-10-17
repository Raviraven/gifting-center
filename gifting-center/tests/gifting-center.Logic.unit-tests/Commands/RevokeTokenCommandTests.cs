using gifting_center.Logic.Commands;
using gifting_center.Logic.Entities;
using gifting_center.Logic.Repositories;
using gifting_center.unit_tests.Utils.Builders.DatabaseEntities;

namespace gifting_center.Logic.unit_tests.Commands;

public class RevokeTokenCommandTests
{
    private readonly IRefreshTokenRepository _refreshTokenRepository;
    private readonly IDateTimeProvider _dateTimeProvider;
    
    private readonly RevokeTokenCommandHandler _sut;

    public RevokeTokenCommandTests()
    {
        _refreshTokenRepository = Substitute.For<IRefreshTokenRepository>();
        _dateTimeProvider = Substitute.For<IDateTimeProvider>();
        
        _sut = new RevokeTokenCommandHandler(_refreshTokenRepository, _dateTimeProvider);
    }
    
    [Fact]
    public async void should_return_revoked_token()
    {
        var token = "token-to-revoke";
        var utcNow = DateTime.UtcNow;
        var refreshToken = new RefreshTokenEntityBuilder()
            .WithToken(token)
            .Build();
        
        
        _refreshTokenRepository.GetByRefreshToken(token).Returns(refreshToken);
        _dateTimeProvider.UtcNow.Returns(utcNow);
        
        var result = await _sut.Handle(new RevokeTokenCommand(token), CancellationToken.None);

        result.Should().Be("token-to-revoke");
        refreshToken.Revoked.Should().Be(utcNow);
        await _refreshTokenRepository.Received(1).SaveChanges();
    }

    public static IEnumerable<object?[]> InvalidData =
        new List<object?[]>
        {
            new object?[] { string.Empty, null },
            new object?[] { "not-found-token", null },
            new object?[]
            {
                "already-revoked", new RefreshTokenEntityBuilder()
                    .WithToken("already-revoked")
                    .WithRevoked(DateTime.UtcNow)
                    .Build()
            }    
        };
    
    [Theory]
    [MemberData(nameof(InvalidData))]
    public async void should_return_empty_string_when_invalid_data(string token, RefreshTokenEntity entityFromDb)
    {
        _refreshTokenRepository.GetByRefreshToken(token).Returns(entityFromDb);
        
        var result = await _sut.Handle(new RevokeTokenCommand(token), CancellationToken.None);

        result.Should().BeEmpty();
    }
}