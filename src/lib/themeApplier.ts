document.addEventListener("astro:page-load", () => {
  const app = <HTMLElement>document.getElementById("app");

  let theme: string;
  if (JSON.parse(<string>localStorage.getItem("isdark"))) {
    theme = "night";
  } else {
    theme = "emerald";
  }
  app.setAttribute("data-theme", theme);
});
