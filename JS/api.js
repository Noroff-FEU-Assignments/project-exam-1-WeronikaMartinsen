function showError(message) {
  const errorContainer = document.querySelector(".carousel");

  if (errorContainer) {
    errorContainer.innerHTML = `<h3>Error: ${message}</h3>`;
  } else {
  }
}

const url = "https://www.rainy-days.no/wp-json/wp/v2/posts/?per_page=30";

export async function getPosts() {
  showLoadingIndicator();
  const response = await fetch(url);
  const result = await response.json();

  if (response.ok) {
    hideLoadingIndicator();
    return result;
  } else {
    throw new Error("Failed to fetch!");
  }
}

export async function getPost() {
  const response = await fetch(singlePostId);
  const result = await response.json();
  return result;
}

export async function displayPosts() {
  try {
    const posts = await getPosts();
    const carouselContainer = document.querySelector(".carousel");

    carouselContainer.innerHTML = "";

    posts.forEach((post) => {
      console.log(posts);
      console.log(post);
      const postCard = document.createElement("div");
      postCard.className = "postCard";
      postCard.innerHTML = `      
      
      <div class="imgDiv"><a href="html/blog-specific.html?id=${post.id}&title=${post.title.rendered}"><img class="postImg" alt="${post.better_featured_image_alt_text}" src="${post.jetpack_featured_media_url}"></a></div>
        <div class="divText"><h5>${post.title.rendered}</h5><span class="spanDate">${post.date}</span></div>
                    
      `;
      carouselContainer.appendChild(postCard);
    });
    const carousel = document.querySelector(".carousel");
    const prevButton = document.getElementById("slide-arrow-prev");
    const nextButton = document.getElementById("slide-arrow-next");
    const numVisiblePosts = 4;
    let currentSlide = 0;

    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener("touchmove", (e) => {
      touchStartX = e.touches[0].clientX;
    });

    carousel.addEventListener("touchmove", (e) => {
      touchEndX = e.changedTouches[0].clientX;
      handleSwipe();
    });

    carousel.addEventListener("touchmove", (e) => {
      e.preventDefault();
    });

    function handleSwipe() {
      const minSwipeDistance = 50;

      const swipeDistance = touchEndX - touchStartX;

      if (swipeDistance > minSwipeDistance) {
        moveCarousel(-1);
      } else if (swipeDistance < -minSwipeDistance) {
        moveCarousel(1);
      }
    }

    nextButton.addEventListener("click", () => {
      console.log("Button clicked");
      if (currentSlide < Math.ceil(posts.length / numVisiblePosts) - 1) {
        moveCarousel(1);
      }
      updateCarouselView();
    });

    prevButton.addEventListener("click", () => {
      console.log("Button clicked");
      if (currentSlide > 0) {
        moveCarousel(-1);
      }
      updateCarouselView();
    });

    function moveCarousel(direction) {
      currentSlide += direction;
      if (currentSlide < 0) {
        currentSlide = 0;
      } else if (currentSlide >= Math.ceil(posts.length / numVisiblePosts)) {
        currentSlide = Math.ceil(posts.length / numVisiblePosts) - 1;
      }
    }

    function updateCarouselView() {
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

    updateCarouselView();
  } catch (error) {
    showError("Failed to fetch posts");
  }
}
function showLoadingIndicator() {
  const loading = document.querySelector(".loadingIndicator");
  loading.innerHTML = `<div class="loading">
  <div class="dot dot1"></div>
  <div class="dot dot2"></div>
  <div class="dot dot3"></div>
</div>`;
}
function hideLoadingIndicator() {
  const loading = document.querySelector(".loadingIndicator");
  loading.style.display = "none"; // Hide the loading indicator
}

displayPosts();
