using System;
using System.Collections.Generic;

namespace Back_End.Models;

public partial class Rating
{
    public int FanSsn { get; set; }

    public int MatchStaffSsn { get; set; }

    public int MatchId { get; set; }

    public int? Rate { get; set; }

}
