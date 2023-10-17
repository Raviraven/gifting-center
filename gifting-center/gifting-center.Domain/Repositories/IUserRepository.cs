using gifting_center.Domain.Entities;

namespace gifting_center.Domain.Repositories;

public interface IUserRepository
{
    Task<UserEntity?> GetByEmail(string email);
    Task<UserEntity?> GetByRefreshToken(string token);
    void Add(UserEntity user);

    Task SaveChanges();
}