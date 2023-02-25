using gifting_center.Data.ViewModels;
using gifting_center.Logic.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace gifting_center.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GiftsController : ControllerBase
    {
        private readonly IGiftsService _giftsService;

        public GiftsController(IGiftsService giftsService)
        {
            _giftsService = giftsService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Gift>> GetById(int id)
        {
            return Ok(await _giftsService.GetById(id));
        }

        [HttpGet]
        public async Task<ActionResult<List<Gift>>> GetAll()
        {
            return Ok(await _giftsService.Get());
        }

        [HttpGet("/user/{userId}")]
        public async Task<ActionResult<List<Gift>>> GetGiftsForUser(int userId)
        {
            return Ok(await _giftsService.GetByUserId(userId));
        }

        [HttpPost]
        public async Task<ActionResult<GiftAdd>> AddGift(GiftAdd gift)
        {
            return Ok(await _giftsService.Add(gift));
        }

        [HttpPut]
        public async Task<ActionResult<GiftEdit>> Edit(GiftEdit gift)
        {
            return Ok(await _giftsService.Edit(gift));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            return Ok(await _giftsService.Delete(id));
        }
    }
}
