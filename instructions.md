# State Management Quiz - Zustand or Context API

This week, the task is to build a quiz game using **EITHER** `Zustand` or React's **`useContext`** for state management. It's a multiple-choice quiz, so you'll need to define your own questions and a bunch of possible answers to present to your users.

It's up to you to decide what your quiz should be about! Maybe you want to test your user's general knowledge with trivia questions? Additionally, as you design your quiz application, you'll need to make an important decision regarding state management. You can choose between using Zustand or the Context API, each offering its own set of advantages and considerations. Ensure you research both options to determine which best suits your project's needs.

## Requirements

- Your quiz should have at least 5 questions.

- When the user selects an answer, it should show if they were correct or not.

- While going through the quiz, it should show which question you're on, or how many are left - for example 'Question 5 / 15' or '10 questions left'.

- When the user has answered all the questions, they should get to a summary screen that tells them how many they got correct or incorrect.

- Don't forget CSS! Your quiz should be well-styled.

## Stretch goals

- After selecting an answer, highlight the correct answer if they chose incorrectly.

- Create a visual progress bar showing how many questions are left to be answered.

- Use images or videos to make your questions and answers look richer.

- Give a score for correct answers and deduct points for incorrect answers. If the user goes below a certain score, they lose!

- Enrich the summary with information about what questions they got correct and what questions they should practice more.

- Implement a countdown timer to answer the question - if the user doesn't answer in time, they get the question wrong.

- Implement a timer to show the user how long it took to complete the quiz.

## Getting started 🤓

In this project setup, we've provided two distinct state management approaches for your quiz game: Zustand and React's `useContext`. Your task is to collaborate as a team and utilize these state management techniques to render the quiz questions sequentially. Each question should display the question text and its associated options. Upon selecting an answer, the application should indicate whether the chosen answer is correct or incorrect, and then guide the user to the subsequent question.

For the `useContext` approach:

- We've initialized a context for the quiz in the `./src/context/QuizContext.jsx` file. This context will manage the state of your quiz and provide functions to interact with it.
- The starting point for this approach is the `./src/components/CurrentQuestionUseContext.jsx` component. This component fetches the current question from the context and displays it.

For the Zustand approach:

- The Zustand store for the quiz is set up in the `./src/stores/useQuizStore.jsx` file. This store will hold the state of your quiz and offer functions to manipulate it.
- The starting point for the Zustand approach is the `./src/components/CurrentQuestionZustand.jsx` component. This component retrieves the current question from the Zustand store and renders it.

Your main objective is to choose one of these state management systems—either useContext or Zustand—and integrate it into your application. Ensure a smooth quiz experience for the user by rendering the questions, presenting the possible answers, and providing feedback on the user's selection before progressing to the next question. While both approaches are provided for learning purposes, for this project, you should commit to just one to maintain clarity and consistency in your codebase.

## Planning

### You should discuss these questions before you fork and clone the repo:
- Will you use a planning tool (Jamboard, Figma) to plan your design/app structure?
- How are you going to work in the team? E.g. Laying out the foundation together and then splitting up? Mob program approach all the way? Smaller groups / pairs / solo?
- What is your quiz about?
- Have you decided on a state management approach? Zustand or **`useContext`**?
- Which are your (at least) 5 questions and answers? (Remember, multiple choices required)
- How are you going to show the progress? i.e 1 / 5, 20%, 4 questions left.
- How will the user select the answer? Dropdown, selecting with keyboard commands, buttons, images?
- What will the summary screen look like?
- What components do you need?
- How are you dealing with the styling?
- What stretch goals are you aiming for?

### The Questions Array
You can find the `quiz` state setup in two different locations based on the state management approach:

- For the `useContext` approach: `./src/context/QuizContext.jsx`
- For the Zustand approach: `./src/stores/useQuizStore.jsx`

In both setups, there's a `questions` array with a couple of placeholder objects for you to get started with. You should replace these questions with your own ones.

You're free to restructure things if you want to, but it's recommended to stick with the current setup where each question has:

- `id` - a unique identifier for the question. You can just keep incrementing numbers for these.
- `questionText` - this is the text which is displayed to the user for this question. The example questions use a string of text, but you could turn this into an object if you wanted to include images or other data.
- `options` - an array of possible answers to the question which your user will choose from. Again, in the placeholder questions, we've used strings, but you can switch them to objects if you want to add additional details such as image URLs.
- `correctAnswerIndex` - the index of the item in the `options` array which is the correct answer.

### State Management Actions
Depending on your chosen state management approach, you'll interact with the quiz state differently:

### `submitAnswer`
Use this function when a user selects an answer to the question. You need to pass an object with a key `questionId` whose value is a valid question id (from the question objects) and an `answerIndex` which is the index of the answer they chose.

- submitAnswer example for `useContext`

Given the following question, for example:

```JS
{ id: 1, questionText: 'Who set the Olympic record for the 100m dash in 2012?', options: ['Usain Bolt', 'Justin Gatlin', 'Tyson Gay', 'Asafa Powell'], correctAnswerIndex: 0 }
```

If the user clicks 'Asafa Powell' (index 3 in the options array), you'd use the context like this:

```JS
  const { submitAnswer } = useQuiz();
  submitAnswer(1, 3);
```

- submitAnswer example for Zustand

Using the same question, with Zustand:

```JS
  useQuizStore.getState().submitAnswer(1, 3);
```

### `goToNextQuestion`

After the user clicks an answer and you show them if they were correct or not, you should show a button to continue to the next question. When they click that button, use this function.

- goToNextQuestion example for `useContext`

```JS
  const { goToNextQuestion } = useQuiz();
  goToNextQuestion();
```

- goToNextQuestion example for Zustand

```JS
 useQuizStore.getState().goToNextQuestion();
```

### `restart`
At the end of the quiz, if you want to start over, you can use this function.

- restart example for `useContext`

```JS
const { restart } = useQuiz();
restart();
```

- restart example for Zustand

```JS
  useQuizStore.getState().restart();
```

### Selecting from the State
Depending on your chosen state management approach, you'll fetch the quiz data differently:

**For the `useContext` approach:**
In the `CurrentQuestionUseContext` component, you can use the `useQuiz` hook to access the quiz state. Here's how you can fetch the current question:

```JS
  const { questions, currentQuestionIndex } = useQuiz();
  const question = questions[currentQuestionIndex];
```

To fetch the answer to a specific question:

```JS
  const { answers } = useQuiz();
  const answer = answers.find((a) => a.questionId === question.id);
```

**For the Zustand approach:**
In the `CurrentQuestionZustand` component, you can use the `useQuizStore` to access the quiz state. Here's how you can fetch the current question:

```JS
  const questions = useQuizStore((state) => state.questions);
  const currentQuestionIndex = useQuizStore((state) => state.currentQuestionIndex);
  const question = questions[currentQuestionIndex];
```

To fetch the answer to a specific question:

```JS
  const answers = useQuizStore((state) => state.answers);
  const answer = answers.find((a) => a.questionId === question.id);
```

### Hints and tips to complete the project 🤓
This project is quite open ended, so you should make sure to start with a sketch and make sure your team is aligned on how things should work and who's going to do what. After laying out the foundation together, it's up to you to decide how you want to work in your teams; whether you break up into smaller groups and work on specific features, or whether you continue to work as a big mob.

Whatever you do, remember to break tasks up into small chunks and don't take on too many things at once!
