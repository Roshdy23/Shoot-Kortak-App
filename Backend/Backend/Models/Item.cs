using System;
using System.Collections.Generic;

namespace Back_End.Models;

public partial class Item
{
    public int Id { get; set; }

    public int? ItemPrice { get; set; }

    public string? ItemName { get; set; }

    public string? ItemImage { get; set; }

}
