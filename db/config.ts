// @ts-ignore
import { defineDb, defineTable, column } from "astro:db";

const Comment = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    post: column.number(),
    author: column.text(),
    body: column.text(),
    published: column.text(),
  },
});
const Rili = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    amount: column.number(),
  },
});
const RiliDocs = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    data: column.json(),
  },
});

export default defineDb({
  tables: { Comment, Rili, RiliDocs },
});
