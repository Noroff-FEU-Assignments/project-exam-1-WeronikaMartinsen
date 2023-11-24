import { animateText } from "./functions.js";

document.addEventListener("DOMContentLoaded", function () {
  const textElement = document.getElementById("animatedText");
  const textContent = "So, who Am I?";

  animateText(textElement, textContent);
});
