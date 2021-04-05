using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Sideline.EntityFramework;
using Sideline.WPF.ViewModels;
using Sideline.WPF.Windows;

namespace Sideline.WPF.HostBuilders
{
    public static class AddViewsHostBuilderExtension
    {
        public static IHostBuilder AddViews( this IHostBuilder host )
        {
            host.ConfigureServices( ( context , services ) => {

                services.AddSingleton<MainWindow>( s => new MainWindow( s.GetRequiredService<MainViewModel>()));

            } );

            return host;
        }
    }
}
