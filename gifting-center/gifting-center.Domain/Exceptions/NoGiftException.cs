namespace gifting_center.Domain.Exceptions
{
    public class NoGiftException : Exception, IHttp404Exception
    {
        public NoGiftException() : base() { }

        public NoGiftException(string message) : base(message) { }
    }
}
