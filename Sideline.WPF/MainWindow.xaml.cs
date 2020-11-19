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

namespace Sideline.WPF
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
		}

		public bool TimerIsRunning = false;

		private WebViewWindow WebViewWindow;

		protected override void OnClosing( CancelEventArgs e )
		{
			if( TimerIsRunning )
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
