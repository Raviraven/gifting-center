namespace gifting_center.Logic;

public interface IDateTimeProvider
{
    public DateTime UtcNow { get; }
}

public class DateTimeProvider : IDateTimeProvider
{
    public DateTime UtcNow => DateTime.UtcNow;
}