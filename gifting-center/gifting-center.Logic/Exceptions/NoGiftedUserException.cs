namespace gifting_center.Logic.Exceptions
{
    public class NoGiftedUserException : Exception, IHttp404Exception
    {
        public NoGiftedUserException() : base() { }

        public NoGiftedUserException(string message) : base(message) { }
    }
}
