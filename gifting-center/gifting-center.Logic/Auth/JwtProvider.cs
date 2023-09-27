using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using gifting_center.Data.ViewModels.Auth;
using gifting_center.Logic.Exceptions;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace gifting_center.Logic.Auth;

public interface IJwtProvider
{
    string Generate(User user);
}

public class JwtProvider : IJwtProvider
{
    private readonly string _issuer;
    private readonly string _audience;
    private readonly string _securityKey;
    
    private readonly IConfiguration _configuration;

    public JwtProvider(IConfiguration configuration)
    {
        _configuration = configuration;
        _issuer = _configuration["JwtSettings:Issuer"] ?? 
                  throw new ConfigurationValueMissingException("JwtIssuer"); 
                    // change to nameof(prop) after APpSettings implementation
        _audience = _configuration["JwtSettings:Audience"];
        _securityKey = _configuration["JwtSettings:Key"];
    }


    public string Generate(User user)
    {
        var claims = new Claim[] { };

        var signingCredentials = new SigningCredentials(
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_securityKey)), SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            _issuer,
            _audience,
            claims,
            null,
            DateTime.UtcNow.AddMinutes(15),
            signingCredentials
        );

        var tokenValue = new JwtSecurityTokenHandler().WriteToken(token);

        return tokenValue;
    }
}