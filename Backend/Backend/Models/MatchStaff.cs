
namespace Back_End.Models;

public partial class MatchStaff
{
    public int Id { get; set; }

    public DateOnly? Birthdate { get; set; }

    public string? Nationality { get; set; }

    public string? Photo { get; set; }

    public string? Fname { get; set; }

    public string? Lname { get; set; }

}
