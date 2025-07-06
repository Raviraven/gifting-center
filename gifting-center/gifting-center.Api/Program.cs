using gifting_center.Api.Middlewares;
using gifting_center.Data.Database;
using gifting_center.Data.Repositories;
using gifting_center.Data.Repositories.Interfaces;
using gifting_center.Logic.Services;
using gifting_center.Logic.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddTransient<ICategoriesService, CategoriesService>();
builder.Services.AddTransient<IGiftedUsersService, GiftedUserService>();
builder.Services.AddTransient<IGiftsService, GiftsService>();

builder.Services.AddTransient<ICategoriesRepository, CategoriesRepository>();
builder.Services.AddTransient<IGiftedUsersRepository, GiftedUsersRepository>();
builder.Services.AddTransient<IGiftsRepository, GiftsRepository>();

builder.Services.AddDbContext<PostgresSqlContext>(opts => opts.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.WebHost.ConfigureKestrel(c => c.ConfigureEndpointDefaults(opts =>
{
    // adjust - if running on Pi - get certificate
    // if on Azure - skip it
    if (!builder.Environment.IsDevelopment())
    {
        opts.UseHttps(Environment.GetEnvironmentVariable("HTTPS_CERTIFICATE_NAME") ?? "", 
            Environment.GetEnvironmentVariable("HTTPS_CERTIFICATE_PASSWORD") ?? "");
    }
}));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors();
builder.Services.AddHealthChecks();

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
app.UseAuthorization();

app.MapControllers();
app.MapHealthChecks("/health");

app.UseMiddleware<ErrorHandlerMiddleware>();

app.UseCors((opts) => opts.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.Run();

