using gifting_center.Data.Database.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace gifting_center.Data.Database.Configurations;

public class UserDbConfiguration : IEntityTypeConfiguration<UserDb>
{
    public void Configure(EntityTypeBuilder<UserDb> builder)
    {
        builder.OwnsOne(n => n.RefreshToken, b =>
        {
            b.Property(rt => rt.Created);
            b.Property(rt => rt.Expires);
            b.Property(rt => rt.Revoked);
            b.Property(rt => rt.Token);
        });
    }
}