import type { FC, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

const Title: FC<Props> = ({ children, className, animate = true }: Props) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };

  return (
    <>
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]",
          "inline-block bg-clip-text text-9xl font-extrabold text-transparent",
          className,
        )}
      >
        {children}
      </motion.div>
    </>
  );
};

export default Title;
