export function showLoadingIndicator() {
  const loading = document.querySelector(".loadingIndicator");
  loading.innerHTML = `<div class="loading">
  <div class="dot dot1"></div>
  <div class="dot dot2"></div>
  <div class="dot dot3"></div>
</div>`;
}
