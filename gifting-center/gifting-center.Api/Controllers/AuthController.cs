using gifting_center.Data.ViewModels.Auth;
using gifting_center.Logic.Commands;
using gifting_center.Logic.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace gifting_center.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var result = await this._mediator.Send(new LoginQuery(request.Email, request.Password));
            return string.IsNullOrWhiteSpace(result) ? Unauthorized() : Ok(result);
        }
        //
        // // not needed? mostly action on FE 
        // public IActionResult Logout()
        // {
        //     return Ok();
        // }
        
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest request)
        {
            await this._mediator.Send(new RegisterCommand(request.Username, request.Password, request.Email));
            return Ok();
        }
        
        // public IActionResult RefreshToken()
        // {
        //     return Ok();
        // }
        //
        // public IActionResult RevokeToken()
        // {
        //     return Ok();
        // }
    }
}
