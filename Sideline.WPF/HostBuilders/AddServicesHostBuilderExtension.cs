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

namespace Sideline.WPF.HostBuilders
{
    public static class AddServicesHostBuilderExtension
    {
        public static IHostBuilder AddServices( this IHostBuilder host )
        {
            host.ConfigureServices( ( context , services ) => {

            } );

            return host;
        }
    }
}
