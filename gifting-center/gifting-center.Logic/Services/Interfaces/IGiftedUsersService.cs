using System;
using gifting_center.Data.ViewModels;

namespace gifting_center.Logic.Services.Interfaces
{
	public interface IGiftedUsersService
	{
		Task<GiftedUser> Add(GiftedUser giftedUser);

		Task<bool> Delete(int id);

        Task<GiftedUser> Edit(GiftedUser giftedUser);

		Task<List<GiftedUser>> Get();

		Task<GiftedUser> GetById(string id);
	}
}

