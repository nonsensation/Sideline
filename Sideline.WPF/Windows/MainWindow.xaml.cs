using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using Sideline.WPF.Controls;
using Sideline.WPF.Extensions;
using Sideline.WPF.State;

namespace Sideline.WPF.Windows
{
	/// <summary>
	/// Interaction logic for MainWindow.xaml
	/// </summary>
	public partial class MainWindow : Window
	{
		public MainWindow()
		{
			InitializeComponent();

			


			WebViewWindow = new WebViewWindow();
			WebViewWindow.Show();

			foreach( var tab in TabControl.Items.OfType<TabItem>() )
			{
				if( tab.Name == "TabScoreBoard" )
					tab.Header = IconFont.Score + " " + tab.Header;
			}
		}

		private WebViewWindow WebViewWindow;

		protected override void OnClosing( CancelEventArgs e )
		{
			if( AppState.TimerIsRunning )
			{
				var result = MessageBox.Show(
					"The Timer is running. Do you really want to close this application?" ,
					"Timer is running!" ,
					MessageBoxButton.OKCancel ,
					MessageBoxImage.Information );

				if( result == MessageBoxResult.Cancel )
					e.Cancel = true;
			}

			if( !e.Cancel )
			{
				WebViewWindow.ForceClose();
			}

			base.OnClosing( e );
		}

		
	}
}
