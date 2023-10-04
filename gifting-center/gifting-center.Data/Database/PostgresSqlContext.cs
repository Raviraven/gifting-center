using gifting_center.Data.Database.Configurations;
using gifting_center.Data.Database.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace gifting_center.Data.Database
{
    public class PostgresSqlContext : DbContext
    {
        // change IConfiguration to custom IAppSettings
        private readonly IConfiguration _configuration;
        private readonly string connectionString;

        public PostgresSqlContext()
        {
            
        }
        
        public PostgresSqlContext(DbContextOptions<PostgresSqlContext> options, IConfiguration configuration) : base(options)
        {
            _configuration = configuration;
            this.connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        // protected PostgresSqlContext(IConfiguration configuration)
        // {
        //     _configuration = configuration;
        //     this.connectionString = configuration.GetConnectionString("DefaultConnection");
        // }


        public DbSet<GiftCategoryEntity> GiftCategories { get; set; }

        public DbSet<GiftEntity> Gifts { get; set; }

        public DbSet<GiftedUserEntity> GiftedUsers { get; set; }

        public DbSet<UserEntity> Users { get; set; }

        public DbSet<UserRoleEntity> UserRoles { get; set; }
        

        public void MigrateDatabase()
        {
            this.Database.Migrate();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(string.IsNullOrEmpty(this.connectionString)
                ? "Server=localhost;Port=5432;Database=gifting-center;User Id=postgres;Password=docker;"
                : this.connectionString);

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            new UserDbConfiguration().Configure(modelBuilder.Entity<UserEntity>());
        }
    }
}

