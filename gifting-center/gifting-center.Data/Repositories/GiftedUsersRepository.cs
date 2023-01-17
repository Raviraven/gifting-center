using gifting_center.Data.Database;
using gifting_center.Data.Repositories.Interfaces;
using gifting_center.Data.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace gifting_center.Data.Repositories
{
	public class GiftedUsersRepository : IGiftedUsersRepository
    {
        protected readonly PostgresSqlContext _context;

        public GiftedUsersRepository(PostgresSqlContext context)
        {
            _context = context;
        }

        public async Task<GiftedUser> Add(GiftedUser giftedUser)
        {
            await _context.GiftedUsers.AddAsync(new() {
                Id = giftedUser.Id,
                Name = giftedUser.Name
            });
            await _context.SaveChangesAsync();

            return giftedUser;
        }

        public Task<bool> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<GiftedUser> Edit(int id, GiftedUser giftedUser)
        {
            var userDb = await _context.GiftedUsers.SingleAsync(n => n.Id == id);
            userDb.Name = giftedUser.Name;

            _context.Update(userDb);
            await _context.SaveChangesAsync();
            return giftedUser;
        }

        public async Task<List<GiftedUser>> GetAll()
        {
            var giftedUsers = await _context.GiftedUsers.ToListAsync();
            List<GiftedUser> result = new();
            giftedUsers.ForEach(gu => result.Add(new (gu.Id, gu.Name)));
            return result;
        }

        public async Task<GiftedUser> GetById(int id)
        {
            var user = await _context.GiftedUsers.SingleAsync(n => n.Id == id);
            return new(user.Id, user.Name);
        }
    }
}

