using gifting_center.Domain.Entities;

namespace gifting_center.Domain.Repositories;

public interface IRefreshTokenRepository
{
    Task<RefreshTokenEntity?> GetByRefreshToken(string refreshToken);

    Task SaveChanges();
}