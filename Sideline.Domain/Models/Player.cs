using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Sideline.Domain.Models
{
	public class Player : BaseModel
	{
		public int? TeamId { get; set; }

		[Required]
		public int Number { get; set; }

		[Required]
		public string FirstName { get; set; } = null!;

		[Required]
		public string LastName { get; set; } = null!;

		public string? Info { get; set; }
	}
}
