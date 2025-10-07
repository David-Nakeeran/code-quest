export default async function QuizPage() {
  // button generate quiz, fetch internal api post req
  const res = await fetch("http://localhost:3000/api/quizzes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic: "Arrays" }),
  });
  const { data } = await res.json();
  const quiz = JSON.parse(data);

  const optionElements = quiz.options.map((element: string, index: number) => {
    return (
      <div key={index}>
        <p>{element}</p>
      </div>
    );
  });

  return (
    <>
      <h1>{quiz.question}</h1>
      {optionElements}
      <p>{quiz.correct_answer}</p>
      <p>{quiz.doc_link}</p>
    </>
  );
}
