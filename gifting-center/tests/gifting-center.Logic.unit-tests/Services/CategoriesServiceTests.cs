using gifting_center.Data.Repositories.Interfaces;
using gifting_center.Data.ViewModels;
using gifting_center.Logic.Exceptions;
using gifting_center.Logic.Services;


namespace gifting_center.Logic.unit_tests.Services
{
    public class CategoriesServiceTests
    {
        private readonly ICategoriesRepository _categoriesRepository;

        private CategoriesService _sut;

        private readonly Category defaultCategory;

        public CategoriesServiceTests()
        {
            _categoriesRepository = Substitute.For<ICategoriesRepository>();

            _sut = new CategoriesService(_categoriesRepository);

            defaultCategory = new Category(-1, "test mocked category");
        }

        [Fact]
        public async void get_should_throw_no_category_exception_when_no_categories_found()
        {
            List<Category> categoriesFromDb = new();

            _categoriesRepository.GetAll().Returns(categoriesFromDb);

            await _sut.Invoking(n => n.Get()).Should().ThrowAsync<NoCategoryException>().WithMessage("No categories found");
        }

        [Fact]
        public async void get_should_return_categories()
        {
            List<Category> categoriesFromDb = new() { defaultCategory };

            _categoriesRepository.GetAll().Returns(categoriesFromDb);

            var result = await _sut.Get();

            result.Should().BeEquivalentTo(new List<Category>() { new Category(-1, "test mocked category") });
        }

        [Fact]
        public async void getById_should_throw_no_category_exception_when_no_category_found()
        {
            Category categoryFromDb = null;

            _categoriesRepository.GetById(3).ThrowsAsync(new InvalidOperationException());

            await _sut.Invoking(n => n.GetById(3)).Should().ThrowAsync<NoCategoryException>().WithMessage("There is no category with id: 3");
        }

        [Fact]
        public async void getById_should_return_gift_with_passed_id()
        {
            _categoriesRepository.GetById(3).Returns(defaultCategory);

            var result = await _sut.GetById(3);
            result.Should().BeEquivalentTo(new Category(-1, "test mocked category"));
        }
    }
}

