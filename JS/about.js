import { animateText } from "./functions.js";

document.addEventListener("DOMContentLoaded", function () {
  const textElement = document.getElementById("animateTextAbout");
  const textContent = "so, who Am i?";

  animateText(textElement, textContent);
});
