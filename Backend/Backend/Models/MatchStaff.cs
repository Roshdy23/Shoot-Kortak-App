
namespace Back_End.Models;

public partial class MatchStaff
{
    public int Id { get; set; }

    public string Birthdate { get; set; } = null!;

    public string Nationality { get; set; } = null!;

    public string Photo { get; set; } = null!;

    public string Fname { get; set; } = null!;

    public string Lname { get; set; } = null!;

}
