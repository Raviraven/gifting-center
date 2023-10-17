using Bogus;

namespace gifting_center.unit_tests.Utils.Builders;

/// <summary>
/// 
/// </summary>
/// <typeparam name="T">Entity type</typeparam>
public abstract class BuilderBase<T> where T : class
{
    protected abstract Faker<T> EntityFaker { get; }
    
    public List<T> GenerateList(int count)
    {
        return EntityFaker.Generate(count);
    }
}