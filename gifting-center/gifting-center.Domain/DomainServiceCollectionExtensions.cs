using gifting_center.Domain.Auth;
using gifting_center.Domain.Services;
using gifting_center.Domain.Services.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace gifting_center.Domain;

public static class DomainServiceCollectionExtensions
{
    public static IServiceCollection AddDomain(this IServiceCollection services)
    {
        
        services.AddTransient<ICategoriesService, CategoriesService>();
        services.AddTransient<IGiftedUsersService, GiftedUserService>();
        services.AddTransient<IGiftsService, GiftsService>();
        
        // auth
        services.AddTransient<IJwtProvider, JwtProvider>();
        services.AddTransient<ICryptoProvider, CryptoProvider>();
        services.AddTransient<IRefreshTokenUtils, RefreshTokenUtils>();
        services.AddTransient<IRandomCryptoBytesGenerator, RandomCryptoBytesGenerator>();
        
        // common
        services.AddTransient<IDateTimeProvider, DateTimeProvider>();

        services.AddMediatR(n =>
        {
            n.Lifetime = ServiceLifetime.Scoped;
            //n.RegisterServicesFromAssembly(AppDomain.CurrentDomain.Load("gifting-center.Domain"));
            n.RegisterServicesFromAssembly(typeof(DomainServiceCollectionExtensions).Assembly);
        });
        
        return services;
    }
}