using System;
namespace gifting_center.Logic.Exceptions
{
    public class NoGiftsForUserException : Exception
    {
        public NoGiftsForUserException() : base()
        {
        }

        public NoGiftsForUserException(string message) : base(message) { }
    }
}

