using gifting_center.Data.Database;
using gifting_center.Data.Database.Models;
using gifting_center.Data.Repositories.Interfaces;

namespace gifting_center.Data.Repositories;

public class UserRepository : IUserRepository
{
    private readonly PostgresSqlContext _context;

    public UserRepository(PostgresSqlContext context)
    {
        _context = context;
    }

    public async Task Add(UserDb user)
    {
        this._context.Users.Add(user);
        await _context.SaveChangesAsync();
    }
}