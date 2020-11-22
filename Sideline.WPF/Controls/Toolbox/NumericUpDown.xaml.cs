using System;
using System.Collections.Generic;
using System.Diagnostics;
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
using Sideline.WPF.Windows;

namespace Sideline.WPF.Controls.Toolbox
{
	/// <summary>
	/// Interaction logic for NumericUpDown.xaml
	/// </summary>
	public partial class NumericUpDown : UserControl
	{
		public int Value = 0;

		public int MinValue = 0;
		public int MaxValue = 999;

		public NumericUpDown( int value = 0 , int minValue = 0 , int maxValue = 999 )
		{
			Debug.Assert( minValue < maxValue );

			value = Math.Clamp( value , minValue , maxValue );

			this.Value = value;
			this.MinValue = minValue;
			this.MaxValue = maxValue;
		}

		public NumericUpDown()
		{
			InitializeComponent();

			this.TextBox.Text = this.Value.ToString();

			this.TextBox.TextChanged += this.TextBox_TextChanged;
			this.TextBox.MouseWheel += this.TextBox_MouseWheel;

			this.BtnDn.Click += this.BtnDn_Click;
			this.BtnUp.Click += this.BtnUp_Click;
		}

		private void TextBox_MouseWheel( object sender , MouseWheelEventArgs e )
		{
			if( Keyboard.FocusedElement != this.TextBox )
				return;

			var newValue = this.Value;

			if( e.Delta > 0 )
				newValue++;
			else
				newValue--;

			this.Value = Math.Clamp( newValue , this.MinValue , this.MaxValue );
			this.TextBox.Text = this.Value.ToString();
		}

		private void TextBox_TextChanged( object sender , TextChangedEventArgs e )
		{
			if( !int.TryParse( this.TextBox.Text , out var val ) )
			{
				val = this.Value;
			}

			this.Value = Math.Clamp( val , this.MinValue , this.MaxValue );
			this.TextBox.Text = this.Value.ToString();
		}

		private void BtnDn_Click( object sender , RoutedEventArgs e )
		{
			this.Value = Math.Clamp( this.Value - 1 , this.MinValue , this.MaxValue );
			this.TextBox.Text = this.Value.ToString();
		}

		private void BtnUp_Click( object sender , RoutedEventArgs e )
		{
			this.Value = Math.Clamp( this.Value + 1 , this.MinValue , this.MaxValue );
			this.TextBox.Text = this.Value.ToString();
		}
	}
}
