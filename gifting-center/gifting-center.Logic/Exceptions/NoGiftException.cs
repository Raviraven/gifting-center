namespace gifting_center.Logic.Exceptions
{
    public class NoGiftException : Exception
    {
        public NoGiftException() : base() { }

        public NoGiftException(string message) : base(message) { }
    }
}
