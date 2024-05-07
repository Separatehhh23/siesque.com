import { useState, useEffect } from "react";
import { BackgroundGradient } from "../ui/background-gradient";
import type { FC, ReactNode, MouseEventHandler } from "react";

const RiliTest: FC = () => {
  const [stage, setStage] = useState(0);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (accepted) {
      console.log("accepted");
    }
  }, [accepted]);

  return (
    <div className="flex h-screen flex-row justify-center">
      {stage === 0 && (
        <RiliQuestion question="Rili test">
          <RiliAnswer onClick={() => setStage(1)}>Empezar</RiliAnswer>
        </RiliQuestion>
      )}
      {stage === 1 && (
        <RiliQuestion question="Eres rili?">
          <RiliAnswer onClick={() => setStage(2)}>Si</RiliAnswer>
          <RiliAnswer onClick={() => setStage(2)}>No</RiliAnswer>
        </RiliQuestion>
      )}
      {stage === 2 && (
        <RiliQuestion question="Estas mintiendo?">
          <RiliAnswer onClick={() => setAccepted(true)}>Si</RiliAnswer>
          <RiliAnswer onClick={() => setStage(3)}>No</RiliAnswer>
        </RiliQuestion>
      )}
    </div>
  );
};

interface RiliQuestionProps {
  question: string;
  children: ReactNode;
}

const RiliQuestion: FC<RiliQuestionProps> = ({ question, children }) => {
  return (
    <div className="flex flex-col justify-center sm:h-full md:h-2/3">
      <BackgroundGradient>
        <form
          className="rounded-3xl bg-base-200 p-16"
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className="ml-2 text-7xl text-primary">{question}</h1>
          {children}
        </form>
      </BackgroundGradient>
    </div>
  );
};

interface RiliAnswerProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const RiliAnswer: FC<RiliAnswerProps> = ({ children, onClick }) => {
  return (
    <button
      className="m-4 h-12 w-48 rounded-xl border-2 border-accent"
      onClick={(e) => onClick && onClick(e)}
    >
      {children}
    </button>
  );
};

export default RiliTest;
