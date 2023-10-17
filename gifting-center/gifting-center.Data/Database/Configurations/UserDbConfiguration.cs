using gifting_center.Logic.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace gifting_center.Data.Database.Configurations;

public class UserDbConfiguration : IEntityTypeConfiguration<UserEntity>
{
    public void Configure(EntityTypeBuilder<UserEntity> builder)
    {
        // builder.OwnsOne(n => n.RefreshToken, b =>
        // {
        //     b.Property(rt => rt.Created);
        //     b.Property(rt => rt.Expires);
        //     b.Property(rt => rt.Revoked);
        //     b.Property(rt => rt.Token);
        // });
    }
}