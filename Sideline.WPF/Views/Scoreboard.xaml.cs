using System;
using System.Collections.Generic;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using Sideline.WPF.State;
using Sideline.WPF.Windows;

namespace Sideline.WPF.Views
{
	/// <summary>
	/// Interaction logic for Scoreboard.xaml
	/// </summary>
	public partial class Scoreboard : UserControl
	{
		public Scoreboard()
		{
			InitializeComponent();

			this.Min.MaxValue = 999;
			this.Sec.MaxValue = 59;

			SetTime.Click += this.SetTime_Click;
		}

		private void SetTime_Click( object sender , RoutedEventArgs e )
		{
			AppState.TimerMin = this.Min.Value;
			AppState.TimerSec = this.Sec.Value;

			if( Window.GetWindow( this ) is not MainWindow w )
				throw new Exception();

			w.StaticTop.Timer.Lhs.Content = $"{AppState.TimerMin:D2}";
			w.StaticTop.Timer.Rhs.Content = $"{AppState.TimerSec:D2}";
		}
	}
}
