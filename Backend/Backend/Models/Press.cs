using System;
using System.Collections.Generic;

namespace Back_End.Models;

public partial class Press
{
    public int AdminSsn { get; set; }

    public int JournalistSsn { get; set; }

    public int MatchId { get; set; }

    public int? PerCode { get; set; }

}
