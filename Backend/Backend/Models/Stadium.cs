
namespace Back_End.Models;

public partial class Stadium
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public int? Width { get; set; }

    public int? Capacity { get; set; }

    public int? Length { get; set; }

    public string? Image { get; set; }

    public string? Location { get; set; }

    public int? CreatedAt { get; set; }

}
