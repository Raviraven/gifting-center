using gifting_center.Data.Database;
using gifting_center.Data.Repositories.Interfaces;
using gifting_center.Logic.Entities;
using Microsoft.EntityFrameworkCore;

namespace gifting_center.Data.Repositories;

public class UserRepository : IUserRepository
{
    private readonly PostgresSqlContext _context;

    public UserRepository(PostgresSqlContext context)
    {
        _context = context;
    }

    public async Task<UserEntity?> GetByEmail(string email)
    {
        return await this._context.Users
            .Include(r => r.Roles)
            .Include(n => n.RefreshTokens)
            .FirstOrDefaultAsync(n => n.Email == email);
    }

    public async Task<UserEntity?> GetByRefreshToken(string token)
    {
        return await this._context.Users
            .Include(n => n.Roles)
            .Include(n => n.RefreshTokens)
            .FirstOrDefaultAsync(n => n.RefreshTokens.Any(rt => rt.Token == token));
    }

    public void Add(UserEntity user)
    {
        this._context.Users.Add(user);
    }

    public async Task SaveChanges()
    {
        await _context.SaveChangesAsync();
    }
}