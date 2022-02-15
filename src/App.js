import { useEffect, useState, useRef } from "react";
import { nanoid } from "nanoid";
import Landing, { Loading } from "./Landing";
import "./App.css";
import { Question } from "./Question";

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

function Score(props) {
  const { isCompleted, totalCorrect, handlePlayAgain } = props;
  return (
    <div>
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
  );
}

function Questions(props) {
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
        // incrementCorrectCountRef={incrementCorrectCountRef}
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

const App = () => {
  // const correctCountRef = useRef(0);
  const [questions, setQuestions] = useState([]);

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

  function handleCheckAnswers() {
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

  const FETCH_URL =
    "https://opentdb.com/api.php?amount=5&type=multiple&difficulty=medium";

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

  return (
    <main>
      {isLoading && <Loading />}
      {!isQuizActive && <Landing handleStartGame={handleStartGame} />}
      {isQuizActive && (
        <div>
          <Questions
            isCompleted={isCompleted}
            isLoading={isLoading}
            handleCheckAnswers={handleCheckAnswers}
            onSelectedAnswer={onSelectedAnswer}
            questions={questions}
          />

          <Score
            isCompleted={isCompleted}
            totalCorrect={totalCorrect}
            handlePlayAgain={handlePlayAgain}
          />
        </div>
      )}
    </main>
  );
};

export default App;
