export function showError(message) {
  const errorContainer = document.querySelectorAll(".errorMessage");

  if (errorContainer) {
    errorContainer.innerHTML = `<h3>Error: ${message}</h3>`;
  }
}

export function showLoadingIndicator() {
  const loading = document.querySelector(".loadingIndicator");
  loading.innerHTML = `<div class="loading">
    <div class="dot dot1"></div>
    <div class="dot dot2"></div>
    <div class="dot dot3"></div>
  </div>`;
}

export function hideLoadingIndicator() {
  const loading = document.querySelector(".loadingIndicator");
  loading.style.display = "none";
}

export function animateText(textElement, textContent, index = 0) {
  if (index <= textContent.length) {
    textElement.textContent = textContent.slice(0, index);
    index++;
    setTimeout(() => animateText(textElement, textContent, index), 100); // Adjust the delay between letters (in milliseconds)
  } else {
    // Animation is complete, remove the cursor
    textElement.style.borderRight = "none";
  }
}
