
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

public partial class MiniMatch
{
    public int Id { get; set; }

    public string Home { get; set; } = null!;

    public string Away { get; set; } = null!;
    
    public string homepic { get; set; } = null!;
    public string awaypic { get; set; } = null!;

    public string? Championship { get; set; }

public string? result { get; set; }

    public MiniMatch() { }

}

public partial class BigMatch
{
    public int Id { get; set; }
    public string? Home { get; set; }
    public string? Away { get; set; }
    public string? homepic { get; set; }
    public string? awaypic { get; set; }
    public string? championship { get; set; }
    public string? result { get; set; }
    public List<RatedPlayer>? homeplayers { get; set; }
    public List<RatedPlayer>? awayplayers {get; set; }
    public BigMatch() {  }
}
