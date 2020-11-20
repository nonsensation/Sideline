using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using System.Timers;
using Sideline.WPF.Extensions;

namespace Sideline.WPF
{
	public partial class Sideline_
	{
		public Timer Timer;
		public TimerStopwatch TimerStopwatch = new();

		public int TimerMin;
		public int TimerSec;

		public bool TimerIsRunning;

		public int PeriodTime = 20;
		public bool StopTimerOnPeriodTime = false;

		public void SetupTimer()
		{
			Timer = new Timer();
			Timer.Interval = 90;
			Timer.Enabled = true;
			Timer.Elapsed += (s,e) => {
				var min = (int)Math.Floor( TimerStopwatch.Elapsed.TotalMinutes );
				var sec = TimerStopwatch.Elapsed.Seconds;

				TimerMin = min;
				TimerSec = sec;

				//if( TimerIsRunning )
				//	JsUpdateTimer( min , sec , isRunning: true );

				if( TimerExceededPeriodTime() )
				{
					//TimerStop();
				}
			};
					

			TimerIsRunning = false;
		}

		private void TimerStart()
		{
			if( TimerExceededPeriodTime() )
			{
				//flashControl( checkBoxStopTimerOnPeriodTime );

				return;
			}

			//buttonTimerStartStop.Image = timerImageList.Images[ "timer_pause" ];
			//textBoxTimer.BackColor = Color.LightGreen;

			TimerIsRunning = true;

			TimerStopwatch.Start();
		}

		private void TimerStop()
		{
			//buttonTimerStartStop.Image = timerImageList.Images[ "timer_resume" ];
			//textBoxTimer.BackColor = Color.Orange;
			TimerIsRunning = false;
			TimerStopwatch.Stop();

			//JsUpdateTimer( TimerMin , TimerSec , isRunning: false );
		}

		public void TimerSetTime( int min , int sec )
		{
			TimerStop();

			if( min == 0 && sec == 0 )
			{
				//textBoxTimer.BackColor = Color.White;
				//buttonTimerStartStop.Image = timerImageList.Images[ "timer_play" ];
			}

			TimerStopwatch.SetOffset( new TimeSpan( 0 , min , sec ) );
			TimerStopwatch.Reset();

			//JsUpdateTimer( min , sec , TimerIsRunning );
		}

		private bool TimerExceededPeriodTime()
		{
			return StopTimerOnPeriodTime  &&
				TimerStopwatch.Elapsed.TotalSeconds >= 60 * PeriodTime;
		}


	}
}
