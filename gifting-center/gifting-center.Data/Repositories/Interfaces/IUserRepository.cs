using gifting_center.Data.Database.Models;

namespace gifting_center.Data.Repositories.Interfaces;

public interface IUserRepository
{
    Task<UserDb?> GetByEmail(string email);
    Task Add(UserDb user);
}