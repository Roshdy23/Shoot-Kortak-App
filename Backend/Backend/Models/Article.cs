﻿using System;
using System.Collections.Generic;

namespace Back_End.Models;

public partial class Article
{
    public string Name { get; set; } = null!;

    public int? JournalistSsn { get; set; }

}
