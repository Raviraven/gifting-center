using gifting_center.Data.ViewModels;

namespace gifting_center.Data.Repositories.Interfaces
{
    public interface ICategoriesRepository
    {
        Task<CategoryAdd> Add(CategoryAdd category);

        Task<bool> Delete(int id);

        Task<Category> Edit(Category category);

        Task<List<Category>> GetAll();

        Task<Category> GetById(int id);
    }
}

