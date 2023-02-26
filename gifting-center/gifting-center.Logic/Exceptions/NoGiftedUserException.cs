namespace gifting_center.Logic.Exceptions
{
    public class NoGiftedUserException : Exception
    {
        public NoGiftedUserException() : base() { }

        public NoGiftedUserException(string message) : base(message) { }
    }
}
