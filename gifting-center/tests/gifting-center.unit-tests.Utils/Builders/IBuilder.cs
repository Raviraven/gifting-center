namespace gifting_center.unit_tests.Utils.Builders;

public interface IBuilder<out T> where T : class
{
    T Build();
}