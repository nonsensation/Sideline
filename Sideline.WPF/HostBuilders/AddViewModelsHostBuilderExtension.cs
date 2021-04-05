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

namespace Sideline.WPF.HostBuilders
{
    public static class AddViewModelsHostBuilderExtension
    {
        public static IHostBuilder AddViewModels( this IHostBuilder host )
        {
            host.ConfigureServices( ( context , services ) => {

                services.AddSingleton<MainViewModel>();

            } );

            return host;
        }
    }
}
