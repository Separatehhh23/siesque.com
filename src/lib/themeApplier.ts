const app = <HTMLElement>document.getElementById("app");
let theme: string;

document.addEventListener("astro:page-load", async () => {
  try {
    if (
      typeof JSON.parse(<string>localStorage.getItem("isdark")) === "undefined"
    ) {
      localStorage.setItem(
        "isdark",
        JSON.stringify(
          window.matchMedia("(prefers-color-scheme: dark)").matches,
        ),
      );
    } else {
      if (JSON.parse(<string>localStorage.getItem("isdark"))) {
        theme = "dark";
      } else {
        theme = "light";
      }
    }
  } finally {
    app.setAttribute(
      "data-theme",
      // @ts-ignore
      theme,
    );
  }
});
