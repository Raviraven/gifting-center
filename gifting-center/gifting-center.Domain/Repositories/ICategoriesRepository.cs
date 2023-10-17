using gifting_center.Domain.ViewModels;

namespace gifting_center.Domain.Repositories
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

