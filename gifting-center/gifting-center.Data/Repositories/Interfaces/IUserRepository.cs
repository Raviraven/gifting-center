using gifting_center.Data.Database.Models;

namespace gifting_center.Data.Repositories.Interfaces;

public interface IUserRepository
{
    Task Add(UserDb user);
}