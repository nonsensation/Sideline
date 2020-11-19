using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using System.Timers;
using Sideline.WPF.Extensions;

namespace Sideline.WPF
{
	public partial class Sideline
	{


		private String AsHexString( Color c )
		{
			return $"#{c.R:X2}{c.G:X2}{c.B:X2}";
		}

		private void jsUpdateTimer( int min , int sec , bool isRunning )
		{
			var str = javascriptTableRows
				.Where( x => x.JsTrigger == JsTrigger.UpdateTimer )
				.Single().Javascript
				.Replace( "@minutes" , min.ToString() )
				.Replace( "@seconds" , sec.ToString() )
				.Replace( "@isRunning" , isRunning ? "true" : "false" );

			webViewForm.SendJavascriptAsync( str );
		}

		private void jsUpdateScore( int teamHomeScore , int teamAwayScore )
		{
			var str = javascriptTableRows
				.Where( x => x.JsTrigger == JsTrigger.UpdateScore )
				.Single().Javascript
				.Replace( "@teamHomeScore" , teamHomeScore.ToString() )
				.Replace( "@teamAwayScore" , teamAwayScore.ToString() );

			webViewForm.SendJavascriptAsync( str );
		}

		private void jsUpdateTeamInfo( string team , string info , string value )
		{
			Debug.Assert( team == "home" || team == "away" );
			Debug.Assert( new[] { "shortname" , "fullname" , "backcolor" , "forecolor" , "logo" }.Contains( info ) );
			Debug.Assert( value != null );

			var str = javascriptTableRows
				.Where( x => x.JsTrigger == JsTrigger.UpdateTeamInfo )
				.Single().Javascript
				.Replace( "@team" , $"'{team}'" )
				.Replace( "@info" , $"'{info}'" )
				.Replace( "@value" , $"'{value}'" );

			webViewForm.SendJavascriptAsync( str );
		}

		private void jsUpdatePeriod( string period )
		{
			Debug.Assert( period != null );

			var str = javascriptTableRows
				.Where( x => x.JsTrigger == JsTrigger.UpdatePeriod )
				.Single().Javascript
				.Replace( "@period" , $"'{period}'" );

			webViewForm.SendJavascriptAsync( str );
		}

		private void jsUpdateExtraTime( string extraTime )
		{
			Debug.Assert( extraTime != null );

			var str = javascriptTableRows
				.Where( x => x.JsTrigger == JsTrigger.UpdateExtraTime )
				.Single().Javascript
				.Replace( "@extraTime" , $"'{extraTime}'" );

			webViewForm.SendJavascriptAsync( str );
		}

		private void jsUpdateEmptyNet( string team , bool show )
		{
			Debug.Assert( team == "home" || team == "away" );

			var str = javascriptTableRows
				.Where( x => x.JsTrigger == JsTrigger.UpdateEmptyNet )
				.Single().Javascript
				.Replace( "@team" , $"'{team}'" )
				.Replace( "@show" , show ? "true" : "false" );

			webViewForm.SendJavascriptAsync( str );
		}

	}
}
