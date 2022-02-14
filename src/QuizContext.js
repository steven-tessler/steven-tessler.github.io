import { createContext } from "react";

const QuizContext = createContext([
	{
		correctCount: 0,
		isCompleted: true,
	},
	(obj) => obj,
]);

export default QuizContext;
