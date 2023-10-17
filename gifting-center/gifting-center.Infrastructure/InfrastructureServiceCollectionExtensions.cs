using gifting_center.Domain.Repositories;
using gifting_center.Infrastructure.Database;
using gifting_center.Infrastructure.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace gifting_center.Infrastructure;

public static class InfrastructureServiceCollectionExtensions
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        services.AddTransient<ICategoriesRepository, CategoriesRepository>();
        services.AddTransient<IGiftedUsersRepository, GiftedUsersRepository>();
        services.AddTransient<IGiftsRepository, GiftsRepository>();
        services.AddTransient<IUserRepository, UserRepository>();
        services.AddTransient<IRefreshTokenRepository, RefreshTokenRepository>();

        services.AddDbContext<PostgresSqlContext>();

        return services;
    }
}