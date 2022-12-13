using System;
using gifting_center.Data.Database.Models;
using Microsoft.EntityFrameworkCore;

namespace gifting_center.Data.Database
{
    public class PostgresSqlContext : DbContext
    {
        public PostgresSqlContext(DbContextOptions options) : base(options)
        {
        }


        public DbSet<GiftCategoryDb> GiftCategories { get; set; }

        public DbSet<GiftDb> Gifts { get; set; }

        public DbSet<GiftedUserDb> GiftedUsers { get; set; }

        public DbSet<UserDb> Users { get; set; }

        public DbSet<UserRoleDb> UserRoles { get; set; }

        public void MigrateDatabase()
        {
            this.Database.Migrate();
        }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    base.OnModelCreating(modelBuilder);
        //}

        //public override int SaveChanges()
        //{
        //    ChangeTracker.DetectChanges();
        //    return base.SaveChanges();
        //}
    }
}

