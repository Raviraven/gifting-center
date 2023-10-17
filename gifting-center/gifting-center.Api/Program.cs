using gifting_center.Api;
using gifting_center.Api.Middlewares;
using gifting_center.Domain;
using gifting_center.Infrastructure;
using gifting_center.Infrastructure.Database;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddEnvironmentVariables();

builder.Services
    .AddDomain()
    .AddInfrastructure()
    .AddApplication();


builder.WebHost.ConfigureKestrel(c => c.ConfigureEndpointDefaults(opts =>
{
    if (!builder.Environment.IsDevelopment())
    {
        //TODO: move it to some KernelConfigurationOptions object as it's done with JWT
        opts.UseHttps(Environment.GetEnvironmentVariable("HTTPS_CERTIFICATE_NAME") ?? "",
            Environment.GetEnvironmentVariable("HTTPS_CERTIFICATE_PASSWORD") ?? "");
    }
}));


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

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.UseMiddleware<ErrorHandlerMiddleware>();

app.UseCors((opts) => opts.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.Run();