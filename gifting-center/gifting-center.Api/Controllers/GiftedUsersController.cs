using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using gifting_center.Logic.Services.Interfaces;
using gifting_center.Data.ViewModels;

namespace gifting_center.Api.Controllers
{
    [Route("api/[controller]")]
    public class GiftedUsersController : Controller
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
        public async Task<ActionResult<GiftedUser>> Get(string id)
        {
            return Ok(await _giftedUsersService.GetById(id));
        }

        [HttpPost]
        public async Task<ActionResult<GiftedUser>> Add([FromBody] GiftedUser giftedUser)
        {
            return Ok(await _giftedUsersService.Add(giftedUser));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<GiftedUser>> Put(int id, [FromBody] GiftedUser giftedUser)
        {
            return Ok(await _giftedUsersService.Edit(giftedUser));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            return Ok(await _giftedUsersService.Delete(id));
        }
    }
}

