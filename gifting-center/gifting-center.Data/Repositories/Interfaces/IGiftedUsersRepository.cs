﻿using gifting_center.Data.ViewModels;

namespace gifting_center.Data.Repositories.Interfaces
{
    public interface IGiftedUsersRepository
    {
        Task<GiftedUserAdd> Add(GiftedUserAdd giftedUser);

        Task<bool> Delete(int id);

        Task<GiftedUser> Edit(int id, GiftedUser giftedUser);

        Task<List<GiftedUser>> GetAll();

        Task<GiftedUser> GetById(int id);
    }
}

