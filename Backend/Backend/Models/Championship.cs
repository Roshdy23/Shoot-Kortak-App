
namespace Back_End.Models;

public partial class Championship
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Logo { get; set; }

    public string StartingAt { get; set; }

    public string EndingAt { get; set; }

    public int NoMatches { get; set; }

}
