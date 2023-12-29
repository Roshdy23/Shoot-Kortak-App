
namespace Back_End.Models;

public partial class Question
{
    public int Id { get; set; }

    public string title { get; set; } = null!;

    public List<string>? choices { get; set; } = null!;

    public string TheCorrectAnswer { get; set; } = null!;

    public int QuizId { get; set; }
    public Question() { choices = new List<string>(); }
};

public partial class ExamQuestion
{

    public string title { get; set; } = null!;

    public List<string>? choices { get; set; } = null!;

    public ExamQuestion() { choices = new List<string>(); }
}