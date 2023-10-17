using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using gifting_center.Domain.ViewModels.Auth;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace gifting_center.Domain.Auth;

public interface IJwtProvider
{
    string Generate(User user);
}

public class JwtProvider : IJwtProvider
{
    private readonly JwtOptions _options;

    public JwtProvider( IOptions<JwtOptions> options)
    {
        _options = options.Value;
    }

    public string Generate(User user)
    {
        var claims = new List<Claim>
        {
            new (JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new (JwtRegisteredClaimNames.Sub, user.Email),
            new (JwtRegisteredClaimNames.Email, user.Email),
            new ("userid", user.Id.ToString()),
        };

        claims.AddRange(this.UserRolesClaims(user.Roles));

        var signingCredentials = new SigningCredentials(
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.SecretKey)), SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            _options.Issuer,
            _options.Audience,
            claims,
            null,
            DateTime.UtcNow.AddMinutes(15),
            signingCredentials
        );

        var tokenValue = new JwtSecurityTokenHandler().WriteToken(token);

        return tokenValue;
    }

    private IEnumerable<Claim> UserRolesClaims(IEnumerable<string> roles)
    {
        return !roles.Any() ? Enumerable.Empty<Claim>() : roles.ToList().Select(r => new Claim(ClaimTypes.Role, r));
    }
}