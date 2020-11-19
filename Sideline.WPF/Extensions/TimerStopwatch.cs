using System;
using System.Collections.Generic;
using System.Text;

namespace Sideline.WPF.Extensions
{
	public class TimerStopwatch : System.Diagnostics.Stopwatch
	{
		TimeSpan _offset = new TimeSpan();

		public TimerStopwatch()
		{
		}

		public TimerStopwatch( TimeSpan offset )
		{
			_offset = offset;
		}

		public void SetOffset( TimeSpan offsetElapsedTimeSpan )
		{
			_offset = offsetElapsedTimeSpan;
		}

		new public TimeSpan Elapsed {
			get { return base.Elapsed + _offset; }
			set { _offset = value; }
		}

		new public long ElapsedMilliseconds {
			get { return base.ElapsedMilliseconds + _offset.Milliseconds; }
		}

		new public long ElapsedTicks {
			get { return base.ElapsedTicks + _offset.Ticks; }
		}
	}
}
