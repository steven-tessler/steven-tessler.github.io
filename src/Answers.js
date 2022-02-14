/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { nanoid } from "nanoid";

// const Answers = ({
// 	questionID,
// 	answers,
// 	correctAnswer,
// 	isCompleted,
// 	incrementCorrectCount,
// }) => {
// 	const [chosenAnswer, setChosenAnswer] = useState("");

// 	return (
// 		<div className="answers">
// 			{answers.map((answer) => {
// 				return (
// 					<Answer
// 						key={nanoid()}
// 						questionId={questionId}
// 						answer={answer}
// 						correctAnswer={correctAnswer}
// 						chosenAnswer={chosenAnswer}
// 						setChosenAnswer={setChosenAnswer}
// 						isCompleted={isCompleted}
// 						incrementCorrectCount={incrementCorrectCount}
// 					/>
// 				);
// 			})}
// 		</div>
// 	);
// };

<Answer
	key={nanoid()}
	answer={answer}
	correctAnswer={correctAnswer}
	chosenAnswer={chosenAnswer}
	setChosenAnswer={setChosenAnswer}
	isCompleted={isCompleted}
	incrementCorrectCount={incrementCorrectCount}
/>;

function Answer({ props }) {
	const {
		answer,
		correctAnswer,
		chosenAnswer,
		setChosenAnswer,
		isCompleted,
		incrementCorrectCount,
	} = props;

	let style = {};

	if (chosenAnswer === answer) {
		style = { backgroundColor: "hsl(299, 48%, 38%, .25)" };
		if (isCompleted) {
			if (correctAnswer === chosenAnswer) {
				style = { backgroundColor: "hsl(155, 81%, 53%,.5)" };
				incrementCorrectCount();
			} else {
				//wrong answer
				style = { backgroundColor: "hsl(5, 77%, 60%, .5)" };
			}
		}
	}

	return (
		<div
			style={style}
			className="answer"
			onClick={() => setChosenAnswer(answer)}
		>
			{answer}
		</div>
	);
}
export default Answer;
