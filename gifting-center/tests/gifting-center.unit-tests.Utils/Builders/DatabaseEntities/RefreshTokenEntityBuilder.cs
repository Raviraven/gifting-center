using Bogus;
using gifting_center.Data.Database.Models;

namespace gifting_center.unit_tests.Utils.Builders.DatabaseEntities;

public class RefreshTokenEntityBuilder : BuilderBase<RefreshTokenEntity>
{
    protected sealed override Faker<RefreshTokenEntity> EntityFaker
    {
        get
        {
            return new Faker<RefreshTokenEntity>()
                .RuleFor(n => n.Token, b => b.Random.Hash());
        }
    }

    private RefreshTokenEntity entity;

    public RefreshTokenEntityBuilder()
    {
        this.entity = this.EntityFaker.Generate();
    }

    public RefreshTokenEntityBuilder WithToken(string token)
    {
        this.entity.Token = token;
        return this;
    }

    public RefreshTokenEntityBuilder WithExpires(DateTime expires)
    {
        this.entity.Expires = expires;
        return this;
    }

    public RefreshTokenEntityBuilder WithRevoked(DateTime revoked)
    {
        this.entity.Revoked = revoked;
        return this;
    }

    public RefreshTokenEntity Build() => entity;
}