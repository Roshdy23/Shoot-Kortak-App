
namespace Back_End.Models;

public partial class Quiz
{
    public int Id { get; set; }

    public int? JournalistSsn { get; set; }

    public string? Journalist { get; set; }

    public string? Name { get; set; }    

    public int? qno { get; set; }

    public int? maxp { get; set; }

    public bool? state { get; set; }  

    public List<Question>? questions { get; set; }
    
    public Quiz() { questions = new List<Question>();  }
}

public partial class AnsweringQuiz
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public List<ExamQuestion>? questions { get; set; }

    public AnsweringQuiz() { questions = new List<ExamQuestion>(); }
}

public partial class OutQuiz
{
    public int Id { get; set; }


    public string? Name { get; set; }

    public int? qno { get; set; }

    public int? maxp { get; set; }



    public OutQuiz() { }
}