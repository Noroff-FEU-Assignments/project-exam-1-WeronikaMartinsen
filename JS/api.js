import {
  showError,
  showLoadingIndicator,
  hideLoadingIndicator,
  animateText,
} from "./functions.js";

document.addEventListener("DOMContentLoaded", function () {
  const textElement = document.getElementById("animatedText");

  if (textElement) {
    const textContent = "Welcome to my blog!";
    animateText(textElement, textContent);
  }
});

const url = "https://www.rainy-days.no/wp-json/wp/v2/posts/?per_page=30";

export async function getPosts() {
  showLoadingIndicator();
  try {
    const response = await fetch(url);
    const result = await response.json();

    if (response.ok) {
      hideLoadingIndicator();
      return result;
    }
  } catch {
    showError("Failed to fetch post");
    throw error;
  }
}
export async function displayPosts() {
  try {
    const posts = await getPosts();
    const carouselContainer = document.querySelector(".carousel");
    carouselContainer.innerHTML = "";

    posts.forEach((post) => {
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
      
      <a href="html/blog-specific.html?id=${post.id}&title=${post.title.rendered}"><div class="imgDiv"><img class="imgHero" alt="${post.better_featured_image_alt_text}" src="${post.jetpack_featured_media_url}"></div>
        <div class="divText"><span class="date">${formattedDate}</span><h5>${post.title.rendered}</h5></div></a>
                    
      `;
      carouselContainer.appendChild(postCard);
    });

    const carousel = document.querySelector(".carousel");
    const prevButton = document.getElementById("slide-arrow-prev");
    const nextButton = document.getElementById("slide-arrow-next");
    let numVisiblePosts;

    // Check screen width and set numVisiblePosts accordingly
    if (window.innerWidth <= 500) {
      numVisiblePosts = 1;
    } else {
      numVisiblePosts = 3;
    }

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
      toggleArrowButtons();
      updateCarouselView();
    });

    prevButton.addEventListener("click", () => {
      if (currentSlide > 0) {
        moveCarousel(-1);
      }
      toggleArrowButtons();
      updateCarouselView();
    });

    function toggleArrowButtons() {
      const arrow = document.getElementById("arrow");

      nextButton.style.display =
        currentSlide >= Math.ceil(posts.length / numVisiblePosts) - 1
          ? "none"
          : "block";
      prevButton.style.display = currentSlide <= 0 ? "none" : "block";

      arrow.style.color =
        nextButton.style.display === "none" &&
        prevButton.style.display === "none"
          ? "white"
          : "var(--gray)";

      updateDots();
    }

    function moveCarousel(direction) {
      currentSlide += direction;
      if (currentSlide < 0) {
        currentSlide = 0;
      } else if (currentSlide >= Math.ceil(posts.length / numVisiblePosts)) {
        currentSlide = Math.ceil(posts.length / numVisiblePosts) - 1;
      }
      updateCarouselView();
      toggleArrowButtons();
      updateDots();
    }

    function updateCarouselView() {
      const startIndex = currentSlide * numVisiblePosts;
      const endIndex = startIndex + numVisiblePosts;
      const carouselCards = carousel.querySelectorAll(".carousel-card");

      carouselCards.forEach((card, index) => {
        card.classList.remove("active-carousel"); // Remove active and middle classes from all cards
        card.style.display = "none";
      });

      for (
        let i = startIndex;
        i < Math.min(endIndex, carouselCards.length);
        i++
      ) {
        carouselCards[i].style.display = "block";
        carouselCards[i].classList.add("active-carousel"); // Add active class to all cards
      }
    }

    const dotsContainer = document.querySelector(".carousel-dots");

    function updateDots() {
      dotsContainer.innerHTML = "";

      for (let i = 0; i < Math.ceil(posts.length / numVisiblePosts); i++) {
        const dot = document.createElement("div");
        dot.className = "dotCarousel";
        dot.addEventListener("click", () => {
          currentSlide = i;
          updateCarouselView();
          toggleArrowButtons();
          updateDots();
        });
        dotsContainer.appendChild(dot);
      }

      // Highlight the active dot
      const activeDot = dotsContainer.querySelector(
        `.dotCarousel:nth-child(${currentSlide + 1})`
      );
      if (activeDot) {
        activeDot.classList.add("active-dot");
      }
    }

    updateDots();
    updateCarouselView();
  } catch (error) {
    showError("Failed to fetch posts");
  }
}

displayPosts();
