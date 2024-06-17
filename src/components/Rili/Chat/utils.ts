import { pb } from "@/lib/pocketbase";

type NavWindow = Window &
  typeof globalThis & {
    navigate: (name: string) => Promise<void>;
  };

(window as NavWindow).navigate = async (name: string) => {
  window.location.href = await getProfile(name);
};

export function parseMsg(message: any) {
  // Regular expression to match the pattern @word¬word¬...¬word
  const regex = /@([^¬\s]+(?:¬[^¬\s]+)*)/g;

  // Replace matched substrings with the desired <span> format
  return message.text.replace(regex, (match: string) => {
    // Remove the leading '@' and split the string by '¬'
    const parts = match.slice(1).split("¬");
    const name = parts.join(" ");

    return `<span class="cursor-pointer" data-name="${name}"><button onclick="navigate('${name}')" class="text-secondary">@${name}</button></span> `;
  });
}

export async function getProfile(name: string) {
  const profile = await pb
    .collection("users")
    .getFirstListItem(`name = "${name}"`);
  return `/profile/${profile.id}`;
}
