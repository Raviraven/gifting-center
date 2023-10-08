using gifting_center.Data.Database.Models;

namespace gifting_center.Data.Repositories.Interfaces;

public interface IUserRepository
{
    Task<UserEntity?> GetByEmail(string email);
    Task<UserEntity?> GetByRefreshToken(string token);
    void Add(UserEntity user);

    Task SaveChanges();
}