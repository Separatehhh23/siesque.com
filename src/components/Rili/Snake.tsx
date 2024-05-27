import React, { useRef } from "react";
import type { FC } from "react";

const CastorSnake: FC = () => {
  const canvasRef = useRef(null);

  console.log(canvasRef);

  return (
    <div className="flex h-screen w-screen flex-col justify-center">
      <div className="flex h-screen w-screen flex-row justify-center">
        <canvas className="h-96 w-96" ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default CastorSnake;
