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
    public static class AddDbContextHostBuilderExtensions
    {
        public static IHostBuilder AddDbContext( this IHostBuilder host )
        {
            host.ConfigureServices( ( context , services ) => {
#if USE_MYSQL
                    var connectionString = context.Configuration.GetConnectionString( "mysql" );
                    Action<DbContextOptionsBuilder> configureDbContext = opt => opt.UseMySql( connectionString , ServerVersion.AutoDetect( connectionString ) )
#else // USE_SQLITE
                var connectionString = context.Configuration.GetConnectionString( "sqlite" );
                Action<DbContextOptionsBuilder> configureDbContext = opt => opt.UseSqlite( connectionString );
#endif
                services.AddDbContext<SidelineDbContext>( configureDbContext );
                services.AddSingleton<SidelineDbContextFactory>( new SidelineDbContextFactory( configureDbContext ) );
            } );

            return host;
        }
    }
}
