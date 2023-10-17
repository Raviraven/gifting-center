using gifting_center.Api.Swagger;
using gifting_center.Domain.OptionsSetup;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace gifting_center.Api.Configuration;

public static class ServiceCollectionExtensions
{
    private static void AddJwt(this IServiceCollection services)
    {
        services.AddAuthentication(x =>
        {
            x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer();

        services.ConfigureOptions<JwtOptionsSetup>();
        services.ConfigureOptions<JwtBearerOptionsSetup>();
        
        
        // builder.Services.AddAuthorization(options =>
        // {
        //     options.AddPolicy(AuthData.AdminUserPolicyName,
        //         p => p.RequireClaim(AuthData.AdminUserClaimName, "true"));
        // });

    }
    
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.ConfigureOptions<ConfigureSwaggerOptions>();

        services.AddJwt();

        services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        services.AddCors();

        return services;
    }
}