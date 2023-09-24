using gifting_center.Data.ViewModels;
using gifting_center.Logic.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace gifting_center.Api.Controllers
{
    [Route("api/[controller]")]
    public class GiftedUsersController : ControllerBase
    {
        protected readonly IGiftedUsersService _giftedUsersService;

        public GiftedUsersController(IGiftedUsersService giftedUsersService)
        {
            _giftedUsersService = giftedUsersService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GiftedUser>>> Get()
        {
            return Ok(await _giftedUsersService.Get());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GiftedUser>> Get(int id)
        {
            return Ok(await _giftedUsersService.GetById(id));
        }

        [HttpPost]
        public async Task<ActionResult<GiftedUserAdd>> Add([FromBody] GiftedUserAdd giftedUser)
        {
            return Ok(await _giftedUsersService.Add(giftedUser));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<GiftedUser>> Put(int id, [FromBody] GiftedUser giftedUser)
        {
            return Ok(await _giftedUsersService.Edit(id, giftedUser));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            return Ok(await _giftedUsersService.Delete(id));
        }
    }
}

