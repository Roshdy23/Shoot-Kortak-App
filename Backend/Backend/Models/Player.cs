
namespace Back_End.Models;

public partial class Player:MatchStaff

{

    public int? ClubId { get; set; }

    public float Height { get; set; }

    public int MarketValue { get; set; }

    public string MainPosition { get; set; } = null!;

    public int TShirtNumber { get; set; }

    public string Foot { get; set; } = null!;

}

public partial class RatedPlayer : MatchStaff
{

    public string? Position { get; set; } = null!;
    public bool? rated { get; set; }
    public double? rating { get; set; }
    public string? playerpic { get; set; }
    public RatedPlayer() { }

}

public partial class StatPlayer : MatchStaff
{
    public string? Name { get; set; }
    public int? goals { get; set;}

    public int? assists { get; set; }

    public int? cleansheets { get; set; }

    public int? saves { get; set; }

    public int? tackles { get; set; }
    public double? rating { get; set; }
}