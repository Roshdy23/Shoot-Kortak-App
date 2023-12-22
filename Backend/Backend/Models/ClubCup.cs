using System;
using System.Collections.Generic;

namespace Back_End.Models;

public partial class ClubCup
{
    public int ClubId { get; set; }

    public int ChampionshipId { get; set; }

    public int? Level { get; set; }

}
