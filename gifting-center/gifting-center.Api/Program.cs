using gifting_center.Api.Middlewares;
using gifting_center.Data.Database;
using gifting_center.Data.Repositories;
using gifting_center.Data.Repositories.Interfaces;
using gifting_center.Logic.Auth;
using gifting_center.Logic.Services;
using gifting_center.Logic.Services.Interfaces;
// using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;

// using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddTransient<ICategoriesService, CategoriesService>();
builder.Services.AddTransient<IGiftedUsersService, GiftedUserService>();
builder.Services.AddTransient<IGiftsService, GiftsService>();

builder.Services.AddTransient<ICategoriesRepository, CategoriesRepository>();
builder.Services.AddTransient<IGiftedUsersRepository, GiftedUsersRepository>();
builder.Services.AddTransient<IGiftsRepository, GiftsRepository>();
builder.Services.AddTransient<IUserRepository, UserRepository>();

builder.Services.AddTransient<IJwtProvider, JwtProvider>();
builder.Services.AddTransient<ICryptoProvider, CryptoProvider>();

builder.Services.AddMediatR(n =>
{
    n.Lifetime = ServiceLifetime.Scoped;
    n.RegisterServicesFromAssembly(AppDomain.CurrentDomain.Load("gifting-center.Logic"));
});

// builder.Services.AddDbContext<PostgresSqlContext>(opts =>
//     opts.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddDbContext<PostgresSqlContext>();

builder.WebHost.ConfigureKestrel(c => c.ConfigureEndpointDefaults(opts =>
{
    if (!builder.Environment.IsDevelopment())
    {
        opts.UseHttps(Environment.GetEnvironmentVariable("HTTPS_CERTIFICATE_NAME") ?? "",
            Environment.GetEnvironmentVariable("HTTPS_CERTIFICATE_PASSWORD") ?? "");
    }
}));

// builder.Services.AddAuthentication(x =>
// {
//     x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//     x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//     x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
// }).AddJwtBearer(x =>
// {
//     x.TokenValidationParameters = new TokenValidationParameters
//     {
//         ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
//         ValidAudience = builder.Configuration["JwtSettings:Audience"],
//         IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:Key"])),
//         ValidateIssuer = true,
//         ValidateAudience = true,
//         ValidateLifetime = true,
//         ValidateIssuerSigningKey = true
//     };
// });
//
// builder.Services.AddAuthorization();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors();

var app = builder.Build();

using var scope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope();
var context = scope.ServiceProvider.GetService<PostgresSqlContext>();
context?.MigrateDatabase();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || app.Environment.IsEnvironment("Development-Docker"))
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// app.UseAuthentication();
// app.UseAuthorization();

app.MapControllers();

app.UseMiddleware<ErrorHandlerMiddleware>();

app.UseCors((opts) => opts.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.Run();