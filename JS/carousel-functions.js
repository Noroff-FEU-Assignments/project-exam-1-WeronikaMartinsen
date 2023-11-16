/* let touchStartX = 0;
let touchEndX = 0;
let currentSlide = 0;
let numVisiblePosts = 4;
let posts; // Added a variable to store posts

export function handleSwipe() {
  const minSwipeDistance = 50;
  const swipeDistance = touchEndX - touchStartX;

  if (swipeDistance > minSwipeDistance) {
    moveCarousel(-1);
  } else if (swipeDistance < -minSwipeDistance) {
    moveCarousel(1);
  }
}

export function moveCarousel(direction) {
  console.log("Move Carousel Called");
  currentSlide += direction;
  if (currentSlide < 0) {
    currentSlide = 0;
  } else if (currentSlide >= Math.ceil(posts.length / numVisiblePosts)) {
    currentSlide = Math.ceil(posts.length / numVisiblePosts) - 1;
  }
}

export function updateCarouselView() {
  const startIndex = currentSlide * numVisiblePosts;
  const endIndex = startIndex + numVisiblePosts;
  const postCards = carousel.querySelectorAll(".postCard");

  postCards.forEach((card) => {
    card.style.display = "none";
  });

  for (let i = startIndex; i < Math.min(endIndex, postCards.length); i++) {
    postCards[i].style.display = "block";
  }
}
export function setPosts(data) {
  posts = data;
}
console.log("Carousel Functions file loaded");
 */
