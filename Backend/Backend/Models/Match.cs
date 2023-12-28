
namespace Back_End.Models;

public partial class Match
{
    public int Id { get; set; }

    public string MatchDate { get; set; } = null!;

    public int? Weekno { get; set; }

    public string Club1 { get; set; } = null!;

    public string Club2 { get; set; } = null!;

    public int Championshipid { get; set; }


    public string? result { get; set; }

    public int StadiumId { get; set; }


 
}
