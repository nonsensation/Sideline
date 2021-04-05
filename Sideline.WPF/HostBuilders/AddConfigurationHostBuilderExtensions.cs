using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace Sideline.WPF.HostBuilders
{
    public static class AddConfigurationHostBuilderExtensions
    {
        public static IHostBuilder AddConfiguration( this IHostBuilder host )
        {
            host.ConfigureAppConfiguration( c => {
                c.AddJsonFile( "appsettings.json" );
            } );

            return host;
        }
    }
}
