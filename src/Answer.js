import { decode } from "html-entities";

export function Answer(props) {
  const {
    qid,
    answer,
    correctAnswer,
    chosenAnswer,
    isCompleted,
    // incrementCorrectCountRef,
    onSelectedAnswer,
  } = props;

  let style = {};

  if (chosenAnswer === answer) {
    style = { backgroundColor: "hsla(133, 46%, 71%, 1)" };

    if (isCompleted) {
      if (correctAnswer === chosenAnswer) {
        style = { backgroundColor: "hsla(133, 46%, 71%, 1)" };
        // incrementCorrectCountRef();
      } else {
        style = { backgroundColor: "hsla(360, 81%, 85%, .5)" };
      }
    }
  } else if (isCompleted && correctAnswer !== chosenAnswer) {
    if (answer === correctAnswer) {
      style = { backgroundColor: "hsla(133, 46%, 71%, 1)" };
    }
  }

  return (
    <div
      style={style}
      className="answer"
      onClick={() => onSelectedAnswer(qid, answer)}
    >
      {decode(answer)}
    </div>
  );
}
