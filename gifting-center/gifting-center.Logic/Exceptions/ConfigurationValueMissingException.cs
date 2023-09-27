namespace gifting_center.Logic.Exceptions;

public class ConfigurationValueMissingException : ArgumentNullException
{
    // HTTP 500
    public ConfigurationValueMissingException(string configurationProperty) : base(
        $"Missing field: {configurationProperty} in configuration.")
    {
    }
}