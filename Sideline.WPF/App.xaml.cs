using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using System.Windows;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Sideline.EntityFramework;
using Sideline.WPF.HostBuilders;
using Sideline.WPF.ViewModels;
using Sideline.WPF.Windows;

namespace Sideline.WPF
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        private readonly IHost _host;

        public App()
        {
            this._host = CreateHostBuilder().Build();

        }

        public static IHostBuilder CreateHostBuilder( string[] args = null )
        {
            return Host.CreateDefaultBuilder( args )
                .AddConfiguration()
                .AddDbContext()
                .AddServices()
                .AddViewModels()
                .AddViews()
                ;

        }

        protected override void OnStartup( StartupEventArgs e )
        {
            _host.Start();

            var contextFactory = _host.Services.GetRequiredService<SidelineDbContextFactory>();

            using( var ctx = contextFactory.CreateDbContext() )
            {
                ctx.Database.Migrate();
            }

            var window = _host.Services.GetRequiredService<MainWindow>();

            window.Show();

            base.OnStartup( e );
        }

        protected override async void OnExit( ExitEventArgs e )
        {
            await _host.StopAsync();
            _host.Dispose();

            base.OnExit( e );
        }
    }
}
