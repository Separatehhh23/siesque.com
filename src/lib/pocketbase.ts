import PocketBase from "pocketbase";
import { atom } from "nanostores";

export const pb = new PocketBase("https://siesque.pockethost.io/");

export const currentUser = atom(pb.authStore.model);

pb.authStore.onChange((auth) => {
  currentUser.set(pb.authStore.model);
  console.log("authStore changed", auth);
});
