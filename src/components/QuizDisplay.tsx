type QuizProps = {
  question: string;
  options: string[];
  correct_answer: string;
  doc_link: string;
};

type QuizDisplayProp = {
  quiz: QuizProps;
  handleClick: (arg: string) => void;
  isAnswered: boolean;
  userSelectedAnswer: string;
  isCorrect: boolean;
};

export default function QuizDisplay({
  quiz,
  handleClick,
  isAnswered,
  userSelectedAnswer,
  isCorrect,
}: QuizDisplayProp) {
  const optionElements = quiz.options.map((element, index) => {
    return (
      <div key={index}>
        <button onClick={() => handleClick(element)} disabled={isAnswered}>
          {element}
        </button>
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
