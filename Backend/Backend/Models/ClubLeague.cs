using System;
using System.Collections.Generic;

namespace Back_End.Models;

public partial class ClubLeague
{
    public int ClubId { get; set; }

    public int ChampionshipId { get; set; }

    public int? Pts { get; set; }

    public int? Pld { get; set; }

    public int? W { get; set; }

    public int? D { get; set; }

    public int? L { get; set; }

    public int? Gf { get; set; }

    public int? Ga { get; set; }

    public int? Gd { get; set; }

}
