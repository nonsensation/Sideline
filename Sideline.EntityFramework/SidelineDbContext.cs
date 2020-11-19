using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Sideline.Domain.Models;

namespace Sideline.EntityFramework
{
	public class SidelineDbContext : DbContext
	{
		public DbSet<Team> Teams { get; set; }
		public DbSet<Player> Players { get; set; }

		private string servername = "localhost";
		private int port = 3306;
		private string databaseName = "Sideline";
		private string userName = "root";
		private string password = "";

		private string connectionString => $"server={servername};" +
										   $"port={port};" +
										   $"user={userName};" +
										   $"password={password};" +
										   $"database={databaseName};";

		protected override void OnConfiguring( DbContextOptionsBuilder optionsBuilder )
		{
			if( !optionsBuilder.IsConfigured )
			{
				_ = optionsBuilder

				#region Pomelo
					.UseMySql( connectionString , ServerVersion.AutoDetect( connectionString ) )
				#endregion

					.UseLoggerFactory( LoggerFactory.Create( loggingBuilder => loggingBuilder
						  .AddConsole()
						  .AddDebug()
						  .AddFilter( level => level >= LogLevel.Information ) ) )

					.EnableSensitiveDataLogging()
					.EnableDetailedErrors()
					.EnableServiceProviderCaching()
					;
			}
		}

		protected override void OnModelCreating( ModelBuilder modelBuilder )
		{
			//// Player
			//modelBuilder.Entity<Player>( b => {
			//	b.HasKey( e => e.Id );
			//	b.Property( e => e.FirstName ).IsRequired();
			//	b.Property( e => e.LastName ).IsRequired();
			//	b.Property( e => e.TeamId ).IsRequired( false );
			//	b.Property( e => e.Info ).IsRequired( false );
			//} );
			//modelBuilder.Entity<Player>().HasOne<Team>().WithMany().HasForeignKey( p => p.TeamId );

			//// Team
			//modelBuilder.Entity<Team>( b => {
			//	b.HasKey( e => e.Id );
			//	b.Property( e => e.FullName ).IsRequired();
			//	b.Property( e => e.ShortName ).IsRequired();
			//} );
		}
	}
}
