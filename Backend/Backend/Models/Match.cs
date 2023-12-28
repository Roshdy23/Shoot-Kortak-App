
namespace Back_End.Models;

public partial class Match
{
    public int Id { get; set; }

    public string MatchDate { get; set; } = null!;

    public int? Weekno { get; set; }

    public string Club1 { get; set; } = null!;

    public string Club2 { get; set; } = null!;

    public int Championshipid { get; set; }

<<<<<<< HEAD
    public int? StadiumId { get; set; }

    public string? result { get; set; }
=======
    public int StadiumId { get; set; }
>>>>>>> 769763413002945ba6a0e6b38b16e1b5132d7a0e

    public int result { get; set; }
}
