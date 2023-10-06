namespace gifting_center.Logic.Auth;

public interface IRefreshTokenUtils
{
    RefreshToken Generate();
}

public class RefreshTokenUtils(IRandomCryptoBytesGenerator randomCryptoBytesGenerator) : IRefreshTokenUtils
{
    public RefreshToken Generate()
    {
        var randomBytes = randomCryptoBytesGenerator.Get(64);
        var refreshToken = Convert.ToBase64String(randomBytes);
        var now = DateTime.UtcNow;

        return new RefreshToken(refreshToken, now.AddDays(7), now, null);
    }
}

public record RefreshToken(string Token, DateTime Expires, DateTime Created, DateTime? Revoked);