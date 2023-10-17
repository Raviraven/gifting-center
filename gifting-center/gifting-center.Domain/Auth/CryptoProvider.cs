namespace gifting_center.Domain.Auth;

public interface ICryptoProvider
{
    bool VerifyPassword(string password, string passwordHash);
    string HashPassword(string password);
}

public class CryptoProvider : ICryptoProvider
{
    public bool VerifyPassword(string password, string passwordHash) =>
        BCrypt.Net.BCrypt.Verify(password, passwordHash);

    public string HashPassword(string password) => BCrypt.Net.BCrypt.HashPassword(password);
}