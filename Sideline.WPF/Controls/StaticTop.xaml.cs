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
using Sideline.WPF.Extensions;
using Sideline.WPF.Windows;

namespace Sideline.WPF.Controls
{
	/// <summary>
	/// Interaction logic for StaticTop.xaml
	/// </summary>
	public partial class StaticTop : UserControl
	{
		public StaticTop()
		{
			InitializeComponent();

			Timer.Lhs.Content = "00";
			Timer.Div.Content = ":";
			Timer.Rhs.Content = "00";

			TimerIcon.Content = IconFont.PlayArrow;
		}

		private void TimerButton_MouseEnter( object sender , MouseEventArgs e )
		{
			Cursor = Cursors.Hand;
		}

		private void TimerButton_MouseLeave( object sender , MouseEventArgs e )
		{
			Cursor = null;
		}

		private void TimerButton_Click( object sender , RoutedEventArgs e )
		{
			if( Window.GetWindow( this ) is not MainWindow w )
				throw new Exception();

			//w.TimerIsRunning = !w.TimerIsRunning;

			//if( w.TimerIsRunning )
			//{
			//	TimerIcon.Content = IconFont.Pause;
			//	//TimerIconShadow.Color = TimerTextShadow.Color = Colors.Cyan;
			//}
			//else
			//{
			//	TimerIcon.Content = IconFont.PlayArrow;
			//	//TimerIconShadow.Color = TimerTextShadow.Color = Colors.Tomato;
			//}
		}

		private void TimerButton_MouseDoubleClick( object sender , MouseButtonEventArgs e )
		{
			#if DEBUG

			var r = new Random();

			//TimerText.Content = $"{r.Next( 0 , 120 ):D2} : {r.Next( 0 , 60 ):D2}";

			#endif
		}
	}
}
