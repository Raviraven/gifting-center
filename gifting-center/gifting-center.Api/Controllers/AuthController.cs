using gifting_center.Data.ViewModels.Auth;
using gifting_center.Logic.Commands;
using gifting_center.Logic.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace gifting_center.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var result = await this._mediator.Send(new LoginQuery(request.Email, request.Password));

            var cookieOptions = new CookieOptions()
            {
                HttpOnly = true,
                // TODO: change to _datetimeprovider
                Expires = DateTime.UtcNow.AddDays(7)
            };
            
            Response.Cookies.Append("RefreshToken", result.RefreshToken, cookieOptions);
            
            return string.IsNullOrWhiteSpace(result.AccessToken) ? Unauthorized() : Ok(result);
        }
        
        [HttpPost("register")]
        [AllowAnonymous]
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
