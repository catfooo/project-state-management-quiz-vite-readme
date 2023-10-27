import { CurrentQuestionZustand } from "./components/CurrentQuestionZustand";
import {Footer} from "./components/Footer"

export const App = () => {
  return (
    <div className="main-wrapper">
      <CurrentQuestionZustand />
      <Footer/>

    </div>
  );
};
