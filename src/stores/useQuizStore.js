import { create } from "zustand";

const questions = [
  {
    id: 1,
    questionText: "What is the traditional name for a carved pumpkin used during Halloween?",
    options: ["Gourd of Terror", "Haunted Squash", "Jack-o'-Lantern", "Phantom Pumpkin"],
    correctAnswerIndex: 2,
  },
  {
    id: 2,
    questionText:
      "Which ancient Celtic festival is believed to have inspired the modern-day Halloween celebration?",
    options: ["Beltane", "Samhain", "Imbolc", "Lughnasadh"],
    correctAnswerIndex: 1,
  },
  {
    id: 3,
    questionText:
      "In what country did the tradition of trick-or-treating originate?",
    options: ["United States", "Ireland", "England", "Germany"],
    correctAnswerIndex: 1,
  },
  {
    id: 4,
    questionText:
      "What is the name of the famous animated Halloween special featuring a character named Linus waiting for the Great Pumpkin?",
    options: ["The Nightmare Before Christmas", "It's the Great Pumpkin, Charlie Brown", "Hocus Pocus", "The Corpse Bride"],
    correctAnswerIndex: 1,
  },
  {
    id: 5,
    questionText:
      "Which famous magician died on Halloween in 1926 and is known for his illusions and escape acts?",
    options: ["David Copperfield", "Harry Houdini", "David Blaine", "Criss Angel"],
    correctAnswerIndex: 1,
  },
  {
    id: 6,
    questionText:
      "What is the origin of the phrase 'trick or treat'?",
    options: ["It originated from a medieval custom of offering food to the poor on All Saints' Day.", "It comes from the tradition of performing pranks on Halloween night.", "It refers to the idea that people should give treats to avoid having tricks played on them.", "It was first used as a marketing slogan by a candy company in the early 20th century."],
    correctAnswerIndex: 2,
  }
];

const useQuizStore = create((set) => ({
  // Setting all initial states
  questions,
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false,

  submitAnswer: (questionId, answerIndex) => {
    const question = questions.find((q) => q.id === questionId);

    if (!question) {
      throw new Error(
        "Could not find question! Check to make sure you are passing the question id correctly."
      );
    }

    if (question.options[answerIndex] === undefined) {
      throw new Error(
        `You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`
      );
    }

    // updating the user's answers to the previous selections.
    set((state) => ({
      answers: [
        ...state.answers,
        {
          questionId,
          answerIndex,
          question,
          answer: question.options[answerIndex],
          isCorrect: question.correctAnswerIndex === answerIndex,
        },
      ],
    }));
  },
  //Function to update quizOver from false to true when step is at final/step 6 
  // Else the function will increment the step by one going to next question
  goToNextQuestion: () => {
    set((state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        return { quizOver: true };
      } else {
        return { currentQuestionIndex: state.currentQuestionIndex + 1 };
      }
    });
  },

  //On step summary page, this function will restart the array of selections to blank
  restart: () => {
    set({
      answers: [],
      currentQuestionIndex: 0,
      quizOver: false,
    });
  },
}));

export default useQuizStore;
