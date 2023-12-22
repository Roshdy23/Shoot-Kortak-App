using System;
using System.Collections.Generic;

namespace Back_End.Models;

public partial class User
{
    public int Ssn { get; set; }

    public string? Gender { get; set; }

    public DateOnly? Birthdate { get; set; }

    public string? UserName { get; set; }

    public string? Password { get; set; }

    public string? Email { get; set; }

    public string? Fname { get; set; }

    public string? Lname { get; set; }

}
