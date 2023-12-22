
namespace Back_End.Models;

public partial class Match
{
    public int Id { get; set; }

    public string? MatchDate { get; set; }

    public int? Weekno { get; set; }

    public string? Club1 { get; set; }

    public string? Club2 { get; set; }

    public int? Championshipid { get; set; }

    public int? StadiumId { get; set; }

}
