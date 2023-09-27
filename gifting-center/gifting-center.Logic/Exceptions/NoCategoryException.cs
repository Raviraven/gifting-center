namespace gifting_center.Logic.Exceptions
{
    public class NoCategoryException : Exception, IHttp404Exception
    {
        public NoCategoryException() : base() { }

        public NoCategoryException(string message) : base(message) { }
    }
}
