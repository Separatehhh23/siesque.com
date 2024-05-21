import { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { motion } from "framer-motion";
import moment from "moment";
import { BackgroundGradient } from "../ui/background-gradient";
import {
  type elOtroPurchaseLocation,
  elOtroPurchase as $elOtroPurchase,
  buyElOtro,
  clearElOtroPurchase,
  accessRiliDocs,
} from "@/stores";
import type {
  FC,
  ReactNode,
  MouseEventHandler,
  ChangeEventHandler,
} from "react";

const RiliTest: FC = () => {
  const [stage, setStage] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [camellos, setCamellos] = useState(0);
  const [price, setPrice] = useState(99);
  const [devMode, setDevMode] = useState(false);

  const elOtroPurchase = useStore($elOtroPurchase);

  useEffect(() => {
    if (camellos > 0) {
      setTimeout(() => {
        if (!accepted) setStage(4);
      }, 2000);
    }
  }, [camellos]);

  useEffect(() => {
    if (accepted) {
      setStage(-1); // (-1) -> Not rendered
      accessRiliDocs();
    } else {
      setStage(0);
    }
  }, [accepted]);

  function decreasePrice() {
    if (price > 3) {
      setPrice(price - 3);
      setStage(4);
    }
  }

  function accept() {
    setAccepted(true);
  }

  function complexBuyElOtro(location: elOtroPurchaseLocation) {
    setStage(8);
    buyElOtro(location);
  }

  return (
    <>
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
            <RiliAnswer onClick={accept}>Si</RiliAnswer>
            <RiliAnswer onClick={() => setStage(3)}>No</RiliAnswer>
          </RiliQuestion>
        )}
        {stage === 3 && (
          <RiliQuestion question="Cuantos camellos vales?">
            <RiliAnswer
              inputType="number"
              onChange={(e) => setCamellos(parseInt(e.target.value))}
            />
            <RiliAnswer onClick={accept}>Si</RiliAnswer>
          </RiliQuestion>
        )}
        {stage === 4 && (
          <RiliQuestion question={`Comprarias al otro por ${price} camellos?`}>
            <RiliAnswer onClick={() => setStage(7)}>Si</RiliAnswer>
            <RiliAnswer onClick={() => setStage(5)}>No</RiliAnswer>
          </RiliQuestion>
        )}
        {stage === 5 && (
          <RiliQuestion question="Seguro?">
            <RiliAnswer onClick={decreasePrice}>Si</RiliAnswer>
            <RiliAnswer onClick={() => setStage(6)}>No</RiliAnswer>
          </RiliQuestion>
        )}
        {stage === 6 && (
          <RiliQuestion question="Otra oportunidad?">
            <RiliAnswer onClick={() => setStage(4)}>Ok</RiliAnswer>
            <RiliAnswer onClick={accept}>
              <p className="inline-block">
                Como que la otra?!?!{" "}
                <span className="text-sky-500">@Nico @Nico</span>
              </p>
            </RiliAnswer>
          </RiliQuestion>
        )}
        {stage === 7 ? (
          elOtroPurchase.hasBoughtElOtro ? (
            <RiliQuestion question="Ya lo compraste">
              <RiliAnswer onClick={() => setStage(0)}>Ok</RiliAnswer>
            </RiliQuestion>
          ) : (
            <RiliQuestion question="Donde hacemos el cambio?">
              <RiliAnswer onClick={() => complexBuyElOtro("sahara")}>
                Sahara
              </RiliAnswer>
              <RiliAnswer onClick={() => complexBuyElOtro("vigo")}>
                Vigo
              </RiliAnswer>
            </RiliQuestion>
          )
        ) : null}
        {stage === 8 && (
          <RiliQuestion
            question={`Nos vemos el 
            ${moment(elOtroPurchase.deal?.when).utc().format("DD/MM")} a las 
            ${moment(elOtroPurchase.deal?.when).utc().format("HH:mm")} en 
            ${elOtroPurchase.deal?.location}`}
          >
            <RiliAnswer onClick={() => setStage(0)}>Ok</RiliAnswer>
          </RiliQuestion>
        )}
        {accepted && (
          <RiliQuestion question="Eres un rili">
            <RiliAnswer href="/rili/docs">Ok</RiliAnswer>
            <RiliAnswer onClick={() => setAccepted(false)}>Nah</RiliAnswer>
          </RiliQuestion>
        )}
      </div>
      {devMode && (
        <>
          <p>{`${elOtroPurchase.deal?.when} || ${elOtroPurchase.deal?.location} || ${elOtroPurchase.hasBoughtElOtro}`}</p>
          <button onClick={clearElOtroPurchase}>Clear elOtroPurchase</button>
        </>
      )}
    </>
  );
};

interface RiliQuestionProps {
  question: string;
  children: ReactNode;
}

const RiliQuestion: FC<RiliQuestionProps> = ({ question, children }) => {
  return (
    <motion.div
      variants={{
        initial: {
          x: 200,
          opacity: 0,
        },
        animate: {
          x: 0,
          opacity: 1,
        },
        exit: {
          x: -200,
          opacity: 0,
        },
      }}
      animate="animate"
      initial="initial"
      exit="exit"
      className="flex flex-col justify-center sm:h-full md:h-2/3"
    >
      <BackgroundGradient>
        <form
          className="rounded-3xl bg-base-200 p-16"
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className="ml-2 text-7xl text-primary">{question}</h1>
          <div className="inline-flex">{children}</div>
        </form>
      </BackgroundGradient>
    </motion.div>
  );
};

interface RiliAnswerProps {
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  inputType?: "button" | "number";
  href?: string;
}

const RiliAnswer: FC<RiliAnswerProps> = ({
  children,
  onClick,
  onChange,
  href,
  inputType = "button",
}) => {
  return (
    <a href={href}>
      {inputType === "button" && (
        <button
          className="m-4 h-12 min-w-48 rounded-xl border-2 border-accent p-2"
          onClick={(e) => onClick && onClick(e)}
        >
          {children}
        </button>
      )}
      {inputType === "number" && (
        <input
          className="m-4 h-12 w-48 rounded-xl border-2 border-accent"
          type="number"
          onChange={(e) => onChange && onChange(e)}
        />
      )}
    </a>
  );
};

export default RiliTest;
