import useQuizStore from "../stores/useQuizStore";

import { Summary } from "./Summary";
import "../styling/question.css";


export const CurrentQuestionZustand = () => {
  const questions = useQuizStore((state) => state.questions);
  // console.log("Questions is", questions);

  const currentQuestionIndex = useQuizStore(
    (state) => state.currentQuestionIndex
  );
  const question = questions[currentQuestionIndex];
  // console.log(question);
  const submitAnswer = useQuizStore((state) => state.submitAnswer);
  // console.log(submitAnswer);
  const answers = useQuizStore((state) => state.answers);
  // console.log("Answers: ⭐️", answers);
  const answer = answers.find((a) => a.questionId === question.id);
  // console.log("answer...here...", answer);

  const quizOver = useQuizStore((state) => state.quizOver);
  // console.log("QuizOver Answer:", quizOver);


   // Define isCorrect at the top of the component
   const isCorrect = answer ? answer.isCorrect : false;

   
  // Calculate the progress value and max based on the current question index
  const totalQuestions = questions.length;
  const progressValue = currentQuestionIndex + 1; // Add 1 to make it 1-based
  const progressMax = totalQuestions;

  
  const handleSubmitAnswer = (event) => {
    const answerIndex = Number(event.target.value);
    // console.log(answerIndex);
    const isCorrect = answerIndex === question.correctAnswerIndex;
    submitAnswer(question.id, answerIndex, isCorrect);
  };

  const handleNextQuestion = () => {
    if (answer === null) {
      return; // Do nothing if no answer has been selected
    }
    useQuizStore.getState().goToNextQuestion();
  };
  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>;
  }
  return (
    <>
      {quizOver ? (
        <section className="summary-wrapper">
          <Summary answers={answers} />
        </section>
      ) : (
        <section className="managed-component">
          <h1 className="question-title">
            Question {currentQuestionIndex + 1}: {question.questionText}
          </h1>

          {question.options.map((option, index) => {
            const isSelected = answer && answer.answerIndex === index;
            const isCorrectOption = question.correctAnswerIndex === index;

            return (
              <form key={index}>
                <div className="radio-button-wrapper">
                <input
                  type="radio"
                  id={`option${index}`}
                  name="option"
                  required
                  value={index}
                  onChange={handleSubmitAnswer}
                  checked={answer=== option}
                  disabled={answer}
                />
                <label htmlFor={`option${index}`}>
                  <p>{option}</p>
                  {isSelected && (
                    <span className="answer-feedback">
                      {isCorrectOption ? '✅ Correct Answer' : '❌ Wrong Answer'}
                      {isCorrect ? null : ` (Correct Answer: ${question.options[question.correctAnswerIndex]})`}
                    </span>
                  )}
                </label>
                </div>
              </form>
            );
          })}

          <div className="nextBtn">
            <button
              type="button"
              onClick={handleNextQuestion}
              disabled={!answer}
            >
              Next
            </button>
          </div>
          <div className="progress-wrapper">
        <progress
          className="progress-bar"
          value={(progressValue / progressMax) * 100} // Set value as a percentage
          max="100"
        />
        <div className="progress-text">
          {`${progressValue}/${progressMax}`}
        </div>
      </div>
        </section>
      )}
    </>
  );
};