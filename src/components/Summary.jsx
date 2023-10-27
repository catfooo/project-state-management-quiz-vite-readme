import poopBrain from "/poopBrain.gif";
import treat from "/treat.gif";
import yeah from "/yeah.gif";
import "../styling/summary.css";
import useQuizStore from "../stores/useQuizStore";

export const Summary = ({ answers }) => {
  let count = 0; // Initialize the count outside the map function

  // Calculate the count of correct answers
  answers.forEach((answered) => {
    if (answered.isCorrect === true) {
      count += 1; // Increment the count by 1 if the answer is correct
    }
  });

  const handleRestart = () => {
    useQuizStore.getState().restart();
  };
  return (
    <div className="summary-question-container">
      <h1>🎃 Summary 🎃</h1>
      <div className="gif-part">
        {(count <= 2 && <img src={poopBrain} alt="poop brain gif" />) ||
          (count === 3 && <img src={treat} alt="treat gif" />) ||
          (count >= 4 && <img src={yeah} alt="yeah" />)}
      </div>

      <button type="button" onClick={handleRestart} className="start-over">
        Start Over
      </button>
      {/* Display count only if it is greater than and equal 0 */}
      {count >= 0 && (
        <p className="count-content">You got {count} correct answers!</p>
      )}

      <section className="answered-wrapper">
        {answers.map((answered) => {
          return (
            <div key={answered.questionId} className="answered-questions">
              <h2>Question {answered.questionId}:</h2>
              <p>You Answered: {answered.answer}</p>
              <p className="correct-answer">
                Correct Answer:{" "}
                {
                  answered.question.options[
                    answered.question.correctAnswerIndex
                  ]
                }
              </p>
            </div>
          );
        })}
      </section>
    </div>
  );
};
