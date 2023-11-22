import {
  showError,
  showLoadingIndicator,
  hideLoadingIndicator,
  animateText,
} from "./functions.js";

document.addEventListener("DOMContentLoaded", function () {
  const textElement = document.getElementById("animatedText");
  const textContent = "Welcome to my blog!";

  animateText(textElement, textContent);
});

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
      console.log(post);
      let formattedDate = new Date(Date.parse(post.date)).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      );

      const postCard = document.createElement("div");
      postCard.className = "carousel-card";
      postCard.innerHTML = `      
      
      <div class="imgDiv"><a href="html/blog-specific.html?id=${post.id}&title=${post.title.rendered}"><img class="imgHero" alt="${post.better_featured_image_alt_text}" src="${post.jetpack_featured_media_url}"></a></div>
        <div class="divText"><span class="date">${formattedDate}</span><h5>${post.title.rendered}</h5></div>
                    
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

    carousel.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
    });

    carousel.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].clientX;
      handleSwipe();
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
      if (currentSlide < Math.ceil(posts.length / numVisiblePosts) - 1) {
        moveCarousel(1);
      }
      updateCarouselView();
    });

    prevButton.addEventListener("click", () => {
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
      const carouselCards = carousel.querySelectorAll(".carousel-card");

      carouselCards.forEach((card) => {
        card.style.display = "none";
      });

      for (
        let i = startIndex;
        i < Math.min(endIndex, carouselCards.length);
        i++
      ) {
        carouselCards[i].style.display = "block";
      }
    }

    updateCarouselView();
  } catch (error) {
    showError("Failed to fetch posts");
  }
}

displayPosts();
