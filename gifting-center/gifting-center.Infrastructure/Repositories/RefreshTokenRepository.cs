using gifting_center.Domain.Entities;
using gifting_center.Domain.Repositories;
using gifting_center.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace gifting_center.Infrastructure.Repositories;

public class RefreshTokenRepository : IRefreshTokenRepository
{
    private readonly PostgresSqlContext _context;

    public RefreshTokenRepository(PostgresSqlContext context)
    {
        _context = context;
    }

    public async Task<RefreshTokenEntity?> GetByRefreshToken(string refreshToken)
    {
        return await this._context.RefreshTokens.FirstOrDefaultAsync(n => n.Token == refreshToken);
    }

    public async Task SaveChanges()
    {
        await this._context.SaveChangesAsync();
    }
}