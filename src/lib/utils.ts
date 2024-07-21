import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment/moment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string, extra?: string) {
  return moment(date).format(`DD/MM/YY${extra ?? ""}`);
}

export function getImageURL(
  collectionId: string,
  recordId: string,
  fileName: string,
  size = "0x0",
) {
  return `https://siesque.pockethost.io/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
}
