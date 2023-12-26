
namespace Back_End.Models;

public partial class Player:MatchStaff

{

    public required int ClubId { get; set; }

    public required decimal Height { get; set; }

    public required int MarketValue { get; set; }

    public required string MainPosition { get; set; }

    public required int TShirtNumber { get; set; }

    public required string Foot { get; set; }

}
