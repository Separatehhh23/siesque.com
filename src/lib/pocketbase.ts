import PocketBase from "pocketbase";
import { atom } from "nanostores";

export const pb = new PocketBase("https://siesque.pockethost.io/");

export const currentUser = atom(pb.authStore.model);

pb.authStore.onChange((auth) => {
  console.log("authStore changed", auth);
  currentUser.set(pb.authStore.model);
});
