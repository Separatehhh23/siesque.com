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
const Notes = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    title: column.text(),
    body: column.text(),
    tick: column.boolean(),
  },
});
const CastakeLeaderboard = defineTable({
  columns: {
    username: column.text({ primaryKey: true }),
    score: column.number(),
  },
});

export default defineDb({
  tables: { Comment, Rili, Notes, CastakeLeaderboard },
});
