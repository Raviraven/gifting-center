using gifting_center.Api.Configuration;
using gifting_center.Api.Swagger;

namespace gifting_center.Api;

public static class ApplicationServiceCollectionExtensions
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.ConfigureOptions<ConfigureSwaggerOptions>();

        services.AddJwt();

        // builder.Services.AddAuthorization(options =>
        // {
        //     options.AddPolicy(AuthData.AdminUserPolicyName,
        //         p => p.RequireClaim(AuthData.AdminUserClaimName, "true"));
        // });

        services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        services.AddCors();

        return services;
    }
}