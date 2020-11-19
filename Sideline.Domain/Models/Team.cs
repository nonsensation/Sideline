using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Sideline.Domain.Models
{
	public class Team : BaseModel
	{
		[Required]
		public string FullName { get; set; } = null!;

		[Required]
		public string ShortName { get; set; } = null!;
	}
}
