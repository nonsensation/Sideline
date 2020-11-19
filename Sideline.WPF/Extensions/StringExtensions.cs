using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;

namespace Sideline.WPF.Extensions
{
	public static partial class StringExtensions
	{
		public static String AsHexString( this Color c )
		{
			return $"#{c.R:X2}{c.G:X2}{c.B:X2}";
		}

		private static Random R = new();

		
		public const string AllChars = UpperChars + LowerChars + DigitChars + PunctChars;
		public const string UpperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		public const string LowerChars = "abcdefghijklmnopqrstuvwxyz";
		public const string DigitChars = "0123456789";
		public const string PunctChars = "^°!\"§$%&/{([)]=}?\\`´*+~#'-_.:,;<>|@€";

		public static String GetRandomString( this string _ , int maxLength , string chars = AllChars ) =>
			GetRandomString( _ , minLength: 0 , maxLength , chars );

		public static String GetRandomString( this string _ , int minLength , int maxLength , string chars = AllChars )
		{
			return new string(
				Enumerable.Repeat( chars , R.Next( minLength , maxLength ) )
				.Select( s => s[ R.Next( s.Length ) ] )
				.ToArray()
			);
		}


	}
}
