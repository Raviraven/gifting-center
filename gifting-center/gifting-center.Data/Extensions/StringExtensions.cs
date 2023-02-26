using System;
namespace gifting_center.Data.Extensions
{
	public static class StringExtensions
	{
        public static int ParseId(this string intStr)
        {
            int result;
            if (int.TryParse(intStr, out result))
            {
                return result;
            }
            throw new Exception($"Can't parse given gift id: {intStr}");
        }

    }
}

