using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace gifting_center.Logic.Exceptions
{
    public class NoCategoryException : Exception
    {
        public NoCategoryException() : base() { }

        public NoCategoryException(string message) : base(message) { }
    }
}
