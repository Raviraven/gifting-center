using gifting_center.Data.Database.Models;

namespace gifting_center.Data.Repositories.Interfaces;

public interface IRefreshTokenRepository
{
    Task<RefreshTokenEntity?> GetByRefreshToken(string refreshToken);

    Task SaveChanges();
}