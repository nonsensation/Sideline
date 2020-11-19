using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace Sideline.WPF.Windows
{
	/// <summary>
	/// Interaction logic for WebViewWindow.xaml
	/// </summary>
	public partial class WebViewWindow : Window
	{
		public WebViewWindow()
		{
			InitializeComponent();
		}

		private bool forceClose = false;

		protected override void OnClosing( CancelEventArgs e )
		{
			if( !forceClose )
			{
				e.Cancel = true;

				base.OnClosing( e );
			}
		}

		public void ForceClose()
		{
			forceClose = true;

			this.Close();
		}

	}
}
