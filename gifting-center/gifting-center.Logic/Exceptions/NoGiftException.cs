namespace gifting_center.Logic.Exceptions
{
    public class NoGiftException : Exception, IHttp404Exception
    {
        public NoGiftException() : base() { }

        public NoGiftException(string message) : base(message) { }
    }
}
