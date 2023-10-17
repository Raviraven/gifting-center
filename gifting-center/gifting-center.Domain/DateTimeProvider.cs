namespace gifting_center.Domain;

public interface IDateTimeProvider
{
    public DateTime UtcNow { get; }
}

public class DateTimeProvider : IDateTimeProvider
{
    public DateTime UtcNow => DateTime.UtcNow;
}