import { persistentAtom } from "@nanostores/persistent";
import { Experiments } from "../components/Rili/Experiments";

declare global {
  interface Window {
    experiments: WindowExperiments;
  }
}

export type Experiment<TName> = {
  name: Readonly<TName>;
  value: boolean;
  payload?: () => void;
};

export type Experiments = {
  altLeaderboard: Experiment<"altLeaderboard">;
  [key: string]: Experiment<string>;
};

export type WindowExperiments = {
  get: () => Experiments;
  toggle: typeof toggleExperiment;
  load: typeof loadExperiment;
};

export const experiments = persistentAtom<Experiments>(
  "experiments",
  {
    altLeaderboard: { name: "altLeaderboard", value: false },
  },
  { encode: JSON.stringify, decode: JSON.parse },
);

export function toggleExperiment(experiment: string) {
  if (!Object.keys(experiments.get()).includes(experiment)) return;

  experiments.set({
    ...experiments.get(),
    [experiment]: {
      ...experiments.get()[experiment],
      value: !experiments.get()[experiment].value,
    },
  });
}

// API for adding custom experiments
export function loadExperiment({ name, value, payload }: Experiment<string>) {
  experiments.set({
    ...experiments.get(),
    [name]: {
      name: name,
      value: value ?? false,
      payload: payload,
    },
  });
}

experiments.subscribe((_experiments) => {
  const experimentsArr = Object.keys(_experiments).map(
    (key) => _experiments[key],
  );
  experimentsArr.forEach((experiment) => {
    if (experiment.value && experiment.payload) {
      experiment.payload();
    }
  });
});

export function attachExperiments() {
  window.experiments = {
    get: experiments.get,
    toggle: toggleExperiment,
    load: loadExperiment,
  };
}
