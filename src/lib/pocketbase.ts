import PocketBase from "pocketbase";
import { persistentAtom } from "@nanostores/persistent";

export const pb = new PocketBase("https://siesque.pockethost.io/");

export const newMessages = persistentAtom("newMessages", JSON.stringify([]), {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export function clearAllMessages() {
  newMessages.set([]);
}

await pb.collection("messages").subscribe("*", async ({ action, record }) => {
  if (action === "create") {
    newMessages.set([record, ...newMessages.get()]);
  }
});
