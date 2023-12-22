using System;
using System.Collections.Generic;

namespace Back_End.Models;

public partial class Stat
{
    public int ChampionshipId { get; set; }

    public int PlayerId { get; set; }

    public int? Saves { get; set; }

    public int? Assists { get; set; }

    public int? Goals { get; set; }

    public int? Tackles { get; set; }

    public int? CleanSheets { get; set; }

}
