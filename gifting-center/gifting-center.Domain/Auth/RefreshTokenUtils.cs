namespace gifting_center.Domain.Auth;

public interface IRefreshTokenUtils
{
    RefreshToken Generate();
}

public class RefreshTokenUtils : IRefreshTokenUtils
{
    private readonly IRandomCryptoBytesGenerator _randomCryptoBytesGenerator;

    public RefreshTokenUtils(IRandomCryptoBytesGenerator randomCryptoBytesGenerator)
    {
        _randomCryptoBytesGenerator = randomCryptoBytesGenerator;
    }

    public RefreshToken Generate()
    {
        var randomBytes = _randomCryptoBytesGenerator.Get(64);
        var refreshToken = Convert.ToBase64String(randomBytes);
        var now = DateTime.UtcNow;

        return new RefreshToken(refreshToken, now.AddDays(7), now, null);
    }
}

public record RefreshToken(string Token, DateTime Expires, DateTime Created, DateTime? Revoked);