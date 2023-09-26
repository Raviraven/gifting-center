using System.Security.Cryptography;

namespace gifting_center.Logic.Auth;

public interface IRandomCryptoBytesGenerator
{
    byte[] Get(int count);
}

public class RandomCryptoBytesGenerator : IRandomCryptoBytesGenerator
{
    public byte[] Get(int count)
    {
        var randomNumbers = RandomNumberGenerator.Create();
        var randomBytes = new byte[count];
        randomNumbers.GetBytes(randomBytes);
        return randomBytes;
    }
}