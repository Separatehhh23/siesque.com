import type { ReactNode } from "react";

export const RiliFrases = () => {
  return (
    <div className="m-8 p-8">
      <div className="grid grid-cols-4 gap-4">
        <Frase author="Shelly" year={2018} image="/shelly.webp">
          Fantástico
        </Frase>
        <Frase author="El otro" year={2024}>
          Are lo que yo halla querer
        </Frase>
        <Frase author="El primo" year={2018} image="/primo.webp">
          Me muero!
        </Frase>
        <Frase author="El otro" year={2023}>
          Mo
        </Frase>
        <Frase author="Spike" year={2024}>
          I am spike
        </Frase>
        <Frase author="NiCastorRili" year={2024}>
          Como que prepositorio?
      </div> 
    </div>
  );
};  

type FraseProps = {
  children: ReactNode;
  author?: string;
  year?: number;
  image?: string;
};

const Frase = ({ children, author, year, image }: FraseProps) => {
  return (
    <div className="inline-flex flex-row rounded-lg bg-base-200 p-4">
      <p className="text-xl">
        {children} - {author ?? "Un otro"},{" "}
        {year ?? new Date().getFullYear() + 1}
      </p>
      {image && <img src={image} alt={author} height={32} width={32} />}
    </div>
  );
};
