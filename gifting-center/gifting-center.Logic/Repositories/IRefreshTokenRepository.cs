using gifting_center.Logic.Entities;

namespace gifting_center.Logic.Repositories;

public interface IRefreshTokenRepository
{
    Task<RefreshTokenEntity?> GetByRefreshToken(string refreshToken);

    Task SaveChanges();
}