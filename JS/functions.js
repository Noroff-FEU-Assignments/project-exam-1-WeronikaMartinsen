export function showError(message) {
  const errorContainer = document.getElementById("errorMessage");
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
