
namespace Back_End.Models;

public partial class Championship
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Logo { get; set; }

    public DateTime? StartingAt { get; set; }

    public DateTime? EndingAt { get; set; }

    public int? NoMatches { get; set; }


}
