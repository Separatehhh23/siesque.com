import PocketBase from "pocketbase";
import { persistentAtom } from "@nanostores/persistent";

export const pb = new PocketBase("https://siesque.pockethost.io/");

export const newMessages = persistentAtom("newMessages", {
  messages: []
}, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export function clearAllMessages() {
  newMessages.set({ messages: [] });
}

await pb.collection("messages").subscribe("*", async ({ action, record }) => {
  if (action === "create") {
    newMessages.set({ messages: [...newMessages.get().messages, record] });
  }
});
