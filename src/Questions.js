import { Question } from "./Question";

export function Questions(props) {
  const {
    isCompleted,
    isLoading,
    handleCheckAnswers,
    onSelectedAnswer,
    questions,
  } = props;

  const questionElements = questions.map((q) => {
    // console.log("questionElements: ", q);
    return (
      <Question
        key={q.id}
        id={q.id}
        question={q.question}
        answers={q.answers}
        correctAnswer={q.correctAnswer}
        chosenAnswer={q.chosenAnswer}
        onSelectedAnswer={onSelectedAnswer}
        isCompleted={isCompleted}
      />
    );
  });
  return (
    <>
      <div>{questionElements}</div>
      {!isCompleted && (
        <div>
          {!isLoading && (
            <button
              className="button checkAnswersButton "
              onClick={handleCheckAnswers}
            >
              Check Answers
            </button>
          )}
        </div>
      )}
    </>
  );
}
