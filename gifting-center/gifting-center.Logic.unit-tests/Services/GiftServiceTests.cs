using gifting_center.Data.Repositories.Interfaces;
using gifting_center.Data.ViewModels;
using gifting_center.Logic.Exceptions;
using gifting_center.Logic.Services;

namespace gifting_center.Logic.unit_tests.Services
{
    public class GiftServiceTests
    {
        private Mock<IGiftsRepository> _giftsRepository;

        private GiftsService _sut;

        private GiftList defaultGift;

        public GiftServiceTests()
        {
            _giftsRepository = new Mock<IGiftsRepository>();

            _sut = new GiftsService(_giftsRepository.Object);

            defaultGift = new GiftList(12, "test gift", 100.12f, "url to gift", true, false, 1, 1);
        }

        [Fact]
        public async void get_should_throw_no_gift_exception_when_no_gifts_found()
        {
            List<GiftList> giftsFromDb = new();

            _giftsRepository.Setup(n => n.Get()).ReturnsAsync(giftsFromDb);

            await _sut.Invoking(n => n.Get()).Should().ThrowAsync<NoGiftException>().WithMessage("No gifts found");
        }

        [Fact]
        public async void get_should_return_gifts()
        {
            List<GiftList> giftsFromDb = new() { defaultGift };

            _giftsRepository.Setup(n => n.Get()).ReturnsAsync(giftsFromDb);

            var result = await _sut.Get();

            result.Should().BeEquivalentTo(new List<GiftList>() { new GiftList(12, "test gift", 100.12f, "url to gift", true, false, 1, 1) });
        }

        [Fact]
        public async void getById_should_throw_no_gift_exception_when_no_gift_found()
        {
            Gift giftFromDb = null;

            _giftsRepository.Setup(n => n.GetById(3)).ThrowsAsync(new InvalidOperationException());

            await _sut.Invoking(n => n.GetById(3)).Should().ThrowAsync<NoGiftException>().WithMessage("There is no gift with id: 3");
        }

        [Fact]
        public async void getById_should_return_gift_with_passed_id()
        {
            _giftsRepository.Setup(n => n.GetById(3)).ReturnsAsync(defaultGift);

            var result = await _sut.GetById(3);
            result.Should().BeEquivalentTo(new GiftList(12, "test gift", 100.12f, "url to gift", true, false, 1, 1));
        }

        [Fact]
        public async void getByUserId_should_throw_no_gift_exception_when_no_gifts_for_current_user_found()
        {
            List<GiftList> giftsFromDb = null;

            _giftsRepository.Setup(n => n.GetGiftsByUserId(-3)).ReturnsAsync(giftsFromDb);

            await _sut.Invoking(n => n.GetByUserId(-3)).Should().ThrowAsync<NoGiftException>().WithMessage("There are no gifts for given user id: -3");
        }


        [Fact]
        public async void getByUserId_should_return_gifts_for_current_user()
        {
            List<GiftList> giftsFromDb = new() { defaultGift };

            _giftsRepository.Setup(n => n.GetGiftsByUserId(-3)).ReturnsAsync(giftsFromDb);

            var result = await _sut.GetByUserId(-3);

            result.Should().BeEquivalentTo(new List<GiftList> { new GiftList(12, "test gift", 100.12f, "url to gift", true, false, 1, 1) });
        }
    }
}
