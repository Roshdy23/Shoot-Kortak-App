
namespace Back_End.Models;

public partial class Stadium
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int? Width { get; set; }

    public int? Capacity { get; set; }

    public int? Length { get; set; }

    public string Image { get; set; } = null!;

    public string Location { get; set; } = null!;

    public int CreatedAt { get; set; }

}
