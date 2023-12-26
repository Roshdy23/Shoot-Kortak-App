
namespace Back_End.Models;

public partial class MatchStaff
{
    public int Id { get; set; }

    public required string Birthdate { get; set; }

    public required string Nationality { get; set; }

    public string? Photo { get; set; }

    public required string Fname { get; set; }

    public required string Lname { get; set; }

}
