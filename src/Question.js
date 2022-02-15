import { nanoid } from "nanoid";
import { decode } from "html-entities";
import { Answer } from "./Answer";

export function Question(props) {
  const {
    id,
    question,
    answers,
    correctAnswer,
    chosenAnswer,
    isCompleted,
    // incrementCorrectCountRef,
    onSelectedAnswer,
  } = props;
  // console.log("Question: ", props.answers);
  return (
    <div className="wrapper">
      <div className="container">
        <h2 className="question">{decode(question)}</h2>
        <section className="answers">
          {answers.map((answer) => {
            {
              /* console.log("answers.map: ", question, answer, correctAnswer); */
            }
            return (
              <Answer
                qid={id}
                key={nanoid()}
                answer={answer}
                correctAnswer={correctAnswer}
                chosenAnswer={chosenAnswer}
                isCompleted={isCompleted}
                // incrementCorrectCountRef={incrementCorrectCountRef}
                onSelectedAnswer={onSelectedAnswer}
              />
            );
          })}
        </section>
      </div>
    </div>
  );
}
