using gifting_center.Domain.OptionsSetup;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace gifting_center.Api.Configuration;

public static class ServiceCollectionExtensions
{
    public static void AddJwt(this IServiceCollection services)
    {
        services.AddAuthentication(x =>
        {
            x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer();

        services.ConfigureOptions<JwtOptionsSetup>();
        services.ConfigureOptions<JwtBearerOptionsSetup>();
    }
}