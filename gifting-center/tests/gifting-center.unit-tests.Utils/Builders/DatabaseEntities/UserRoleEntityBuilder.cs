using Bogus;
using gifting_center.Domain.Entities;

namespace gifting_center.unit_tests.Utils.Builders.DatabaseEntities;

public class UserRoleEntityBuilder : BuilderBase<UserRoleEntity>
{
    protected sealed override Faker<UserRoleEntity> EntityFaker
    {
        get
        {
            return new Faker<UserRoleEntity>()
                .RuleFor(n => n.Id, b => b.Random.Int())
                .RuleFor(n => n.Name, b => b.Name.FullName()); 
        }
    }
    
    private readonly UserRoleEntity _entity;

    public UserRoleEntityBuilder()
    {
        _entity = this.EntityFaker.Generate();
    }

    public UserRoleEntityBuilder WithName(string name)
    {
        this._entity.Name = name;
        return this;
    }
    
    public UserRoleEntity Build() => this._entity;
}