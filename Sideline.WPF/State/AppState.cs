using System;
using System.Collections.Generic;
using System.Text;

namespace Sideline.WPF.State
{
	public static class AppState
	{
		public static bool TimerIsRunning = false;

		public static int TimerMin;
		public static int TimerSec;

		public static TimeSpan TimerInterval = TimeSpan.FromMilliseconds( 90 );
	}
}
