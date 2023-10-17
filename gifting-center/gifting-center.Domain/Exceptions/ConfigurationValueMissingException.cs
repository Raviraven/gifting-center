namespace gifting_center.Domain.Exceptions;

public class ConfigurationValueMissingException : ArgumentNullException
{
    // HTTP 500
    public ConfigurationValueMissingException(string configurationProperty) : base(
        $"Missing field: {configurationProperty} in configuration.")
    {
    }
}