using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.Text;
using System.Timers;
using Sideline.WPF.Extensions;

namespace Sideline.WPF
{
	public partial class Sideline_
	{


		private String AsHexString( Color c )
		{
			return $"#{c.R:X2}{c.G:X2}{c.B:X2}";
		}


	}
}
