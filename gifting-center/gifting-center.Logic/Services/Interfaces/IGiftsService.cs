using gifting_center.Data.ViewModels;
using System;

namespace gifting_center.Logic.Services.Interfaces
{
    public interface IGiftsService
    {
        Task<GiftAdd> Add(GiftAdd gift);

        Task<bool> Delete(int id);

        Task<GiftEdit> Edit(GiftEdit gift);

        Task<List<GiftList>> Get();

        Task<GiftList> GetById(int id);

        Task<List<GiftList>> GetByUserId(int userId);
    }
}

