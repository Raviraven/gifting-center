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



builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using var scope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope();
var context = scope.ServiceProvider.GetService<PostgresSqlContext>();
context?.MigrateDatabase();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseMiddleware<ErrorHandlerMiddleware>();

app.Run();

