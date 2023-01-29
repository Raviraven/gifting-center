using System;
using gifting_center.Data.ViewModels;

namespace gifting_center.Logic.Services.Interfaces
{
	public interface IGiftsService
	{
		Task<Gift> Add(Gift gift);

		Task<bool> Delete(int id);

		Task<Gift> Edit(Gift gift);

		Task<Gift> GetById(int id);

		Task<List<Gift>> GetByUserId(int userId);
	}
}

