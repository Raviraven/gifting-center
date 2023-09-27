using FluentAssertions;

namespace tests.gifting_center.Data.unit_tests.Repositories;

public class UserRepositoryTests
{
    [Fact]
    public async void GetByEmail_should_return_user()
    {
        true.Should().BeFalse();
    }
    
    [Fact]
    public async void GetByEmail_should_throw_exception_when_user_not_find()
    {
        true.Should().BeFalse();
    }
}