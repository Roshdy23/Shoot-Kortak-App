﻿
namespace Back_End.Models;

public partial class Player:MatchStaff

{

    public int? ClubId { get; set; }

    public decimal? Height { get; set; }

    public int? MarketValue { get; set; }

    public string? MainPosition { get; set; }

    public int? TShirtNumber { get; set; }

    public string? Foot { get; set; }

}