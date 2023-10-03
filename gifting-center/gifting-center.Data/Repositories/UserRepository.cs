using gifting_center.Data.Database;
using gifting_center.Data.Database.Models;
using gifting_center.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace gifting_center.Data.Repositories;

public class UserRepository : IUserRepository
{
    private readonly PostgresSqlContext _context;

    public UserRepository(PostgresSqlContext context)
    {
        _context = context;
    }

    public async Task<UserDb?> GetByEmail(string email)
    {
        return await this._context.Users.Include(r => r.Roles).FirstOrDefaultAsync(n => n.Email == email);
    }

    public async Task Add(UserDb user)
    {
        this._context.Users.Add(user);
        await _context.SaveChangesAsync();
    }
}