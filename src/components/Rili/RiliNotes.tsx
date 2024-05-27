import { useState } from "react";
import {
  Table,
  TableHead,
  TableHeadElement,
  TableBody,
  TableBodyElement,
} from "../Table";
import { Checkbox } from "../ui/checkbox";
import type { FC } from "react";
import type { RiliTask } from "@/types";

interface Props {
  tasks: RiliTask[];
}

const RiliNotes: FC<Props> = ({ tasks }) => {
  const [notes, setNotes] = useState(tasks);

  async function tick(id: number) {
    const _notes = notes;
    _notes[id].tick = !_notes[id].tick;
    const req = await fetch("/api/changeNotes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(_notes[id]),
    });
    if (req.status !== 200) return;
    setNotes(_notes);
  }

  return (
    <Table>
      <TableHead>
        <TableHeadElement>Done</TableHeadElement>
        <TableHeadElement>Task</TableHeadElement>
        <TableHeadElement>Description</TableHeadElement>
      </TableHead>
      {notes.map((note) => (
        <TableBody key={note.id}>
          <TableBodyElement>
            <Checkbox checked={note.tick} onChange={() => tick(note.id)} />
          </TableBodyElement>
          <TableBodyElement>{note.title}</TableBodyElement>
          <TableBodyElement>{note.body}</TableBodyElement>
        </TableBody>
      ))}
    </Table>
  );
};

export default RiliNotes;
