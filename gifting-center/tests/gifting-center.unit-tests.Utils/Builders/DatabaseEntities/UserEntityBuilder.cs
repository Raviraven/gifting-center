using Bogus;
using gifting_center.Data.Database.Models;

namespace gifting_center.unit_tests.Utils.Builders.DatabaseEntities;

public class UserEntityBuilder : BuilderBase<UserEntity>
{
    protected sealed override Faker<UserEntity> EntityFaker
    {
        get
        {
            return new Faker<UserEntity>()
                .RuleFor(n => n.Email, b => b.Internet.Email())
                .RuleFor(n => n.PasswordHash, b => b.Random.Hash())
                .RuleFor(n => n.Roles, b => new UserRoleEntityBuilder().GenerateList(3))
                .RuleFor(n => n.RefreshTokens, b => new RefreshTokenEntityBuilder().GenerateList(3));
        }
    }

    private UserEntity entity;

    public UserEntityBuilder()
    {
        this.entity = this.EntityFaker.Generate();
    }

    public UserEntityBuilder WithEmail(string email)
    {
        this.entity.Email = email;
        return this;
    }
    
    public UserEntityBuilder WithPassword(string passwordHash)
    {
        this.entity.PasswordHash = passwordHash;
        return this;
    }

    public UserEntityBuilder WithRoles(List<UserRoleEntity> roles)
    {
        this.entity.Roles = roles;
        return this;
    }

    public UserEntityBuilder WithRefreshToken(RefreshTokenEntity refreshToken)
    {
        this.entity.RefreshTokens = new List<RefreshTokenEntity>() { refreshToken };
        return this;
    }

    public UserEntityBuilder WithRefreshTokens(List<RefreshTokenEntity> tokens)
    {
        this.entity.RefreshTokens = tokens;
        return this;
    }
    
    public UserEntity Build()
    {
        return this.entity;
    }
}