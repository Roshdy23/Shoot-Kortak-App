
namespace Back_End.Models;

public partial class Question
{
    public int Id { get; set; }

    public string QuestionContent { get; set; } = null!;

    public string Answer1 { get; set; } = null!;

    public string Answer2 { get; set; } = null!;

    public string Answer3 { get; set; } = null!;

    public string Answer4 { get; set; } = null!;

    public string TheCorrectAnswer { get; set; } = null!;

    public int QuizId { get; set; }
}

