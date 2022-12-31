using System;
using gifting_center.Data.ViewModels;

namespace gifting_center.Logic.Services.Interfaces
{
	public interface IGiftsService
	{
		Task<Gift> Add(Gift gift);

		Task<bool> Delete(string id);

		Task<Gift> Edit(Gift gift);

		Task<Gift> GetById(string id);

		Task<List<Gift>> GetByUserId(string userId);
	}
}

