import { useStore } from "@nanostores/react";

import { experiments, toggleExperiment } from "@/stores";
import { Table } from "@/components/Table";
import { Checkbox } from "../ui/checkbox";

import type { Experiments as TExperiments } from "@/types";

export const Experiments = () => {
  const $experiments = useStore(experiments);

  const getExperiments = () => {
    const _experiments: Array<[keyof TExperiments, boolean]> = [];

    Object.keys($experiments).forEach((key) => {
      const value = $experiments[key as keyof TExperiments];
      _experiments.push([key as keyof TExperiments, value]);
    });

    return _experiments;
  };

  const experimentData = getExperiments();

  return (
    <Table>
      <Table.Head>
        <Table.HeadItem>Enabled</Table.HeadItem>
        <Table.HeadItem>Experiment</Table.HeadItem>
      </Table.Head>

      {experimentData.map(([key, value]) => (
        <Table.Body key={key}>
          <Table.BodyItem>
            <Checkbox checked={value} onClick={() => toggleExperiment(key)} />
          </Table.BodyItem>
          <Table.BodyItem>{key}</Table.BodyItem>
        </Table.Body>
      ))}
    </Table>
  );
};
