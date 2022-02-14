/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { nanoid } from "nanoid";
import Landing from "./Landing";
import "./App.css";
import { decode } from "html-entities";

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function Answer(props) {
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
    style = { backgroundColor: "hsl(299, 48%, 38%, .25)" };

    if (isCompleted) {
      if (correctAnswer === chosenAnswer) {
        style = { backgroundColor: "hsl(155, 81%, 53%,.5)" };
        // incrementCorrectCountRef();
      } else {
        style = { backgroundColor: "hsl(5, 77%, 60%, .5)" };
      }
    }
  } else if (isCompleted && correctAnswer !== chosenAnswer) {
    if (answer === correctAnswer) {
      style = { backgroundColor: "hsl(155, 81%, 53%,.5)" };
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

function Question(props) {
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

const App = () => {
  // const correctCountRef = useRef(0);
  const [questions, setQuestions] = useState([]);
  // 	[
  // 	{
  // 		id: 1,
  // 		question: "1st question",
  // 		answers: ["Answer 1", "2nd Answer", "3rd Answer", "4th Answer"],
  // 		correctAnswer: "2nd Answer",
  // 		chosenAnswer: "",
  // 	},
  // 	{
  // 		id: 2,
  // 		question: "2nd question",
  // 		answers: ["Answer 1", "2nd Answer", "3rd Answer", "4th Answer"],
  // 		correctAnswer: "3rd Answer",
  // 		chosenAnswer: "",
  // 	},
  // 	{
  // 		id: 3,
  // 		question: "3rd question",
  // 		answers: ["Answer 1", "2nd Answer", "3rd Answer", "4th Answer"],
  // 		correctAnswer: "4th Answer",
  // 		chosenAnswer: "",
  // 	},
  // 	{
  // 		id: 4,
  // 		question: "4th question",
  // 		answers: ["Answer 1", "2nd Answer", "3rd Answer", "4th Answer"],
  // 		correctAnswer: "Answer 1",
  // 		chosenAnswer: "",
  // 	},
  // ]
  const [isCompleted, setIsCompleted] = useState(false);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [debugMessage, setDebugMessage] = useState("");

  const handleStartGame = () => {
    setIsQuizActive(true);
  };
  const handlePlayAgain = () => {
    setIsQuizActive(false);
    setIsCompleted(false);
    setTotalCorrect(0);
    setQuestions([]);
  };

  function onSelectedAnswer(questionID, chosenAnswer) {
    // console.log("onSelectedAnswer: ", questionID, chosenAnswer);
    if (isCompleted) return;
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id !== questionID ? q : { ...q, chosenAnswer }
      )
    );
  }

  function handleCheckAnswers(questions) {
    setIsCompleted(true);
    setTotalCorrect(() => {
      let total = 0;
      questions.map((q) => {
        total = q.chosenAnswer === q.correctAnswer ? total + 1 : total;
      });
      return total;
    });
  }
  // function incrementCorrectCountRef() {
  // 	correctCountRef.current++;
  // }

  const FETCH_URL = "https://opentdb.com/api.php?amount=5&difficulty=easy";

  useEffect(() => {
    if (!isQuizActive) {
      return;
    }
    getQuizData();

    async function getQuizData() {
      setIsLoading(true);
      const res = await fetch(FETCH_URL);
      const json = await res.json();
      setIsLoading(false);

      setQuestions(
        json.results.map((q) => {
          let {
            question,
            correct_answer: correctAnswer,
            incorrect_answers: answers,
          } = q;
          answers.unshift(correctAnswer);
          shuffle(answers);
          return {
            id: nanoid(),
            question,
            answers,
            correctAnswer,
            chosenAnswer: "",
          };
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isQuizActive]);

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
        // incrementCorrectCountRef={incrementCorrectCountRef}
      />
    );
  });
  return (
    <main>
      {!isQuizActive && <Landing handleStartGame={handleStartGame} />}
      {isQuizActive && (
        <div>
          <div>{questionElements}</div>
          {!isCompleted && (
            <div>
              {!isLoading && (
                <button
                  className="button checkAnswersButton "
                  onClick={() => handleCheckAnswers(questions)}
                >
                  Check Answers
                </button>
              )}
            </div>
          )}
          {isCompleted && (
            <div className="wrapper">
              <div className="quiz-completed">
                <h4 className="quiz-completed-score">
                  You scored {totalCorrect} / 5 correct answers
                </h4>
                <button
                  className="button button--playAgain"
                  onClick={handlePlayAgain}
                >
                  Play again
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default App;
