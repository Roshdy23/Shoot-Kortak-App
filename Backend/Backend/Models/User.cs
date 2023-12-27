
namespace Back_End.Models;

public partial class User
{
    public int Ssn { get; set; }

    public string Gender { get; set; } = null!;

    public DateOnly Birthdate { get; set; }

    public string UserName { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Fname { get; set; } = null!;

    public string Lname { get; set; } = null!;

}
