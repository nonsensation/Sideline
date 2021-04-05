using System;
using Microsoft.EntityFrameworkCore;

namespace Sideline.EntityFramework
{
    public class SidelineDbContextFactory
    {
        private readonly Action<DbContextOptionsBuilder> _configureDbContext;

        public SidelineDbContextFactory( Action<DbContextOptionsBuilder> configureDbContext )
        {
            _configureDbContext = configureDbContext;
        }

        public SidelineDbContext CreateDbContext()
        {
            DbContextOptionsBuilder<SidelineDbContext> options = new DbContextOptionsBuilder<SidelineDbContext>();

            _configureDbContext( options );

            return new SidelineDbContext( options.Options );
        }
    }
}