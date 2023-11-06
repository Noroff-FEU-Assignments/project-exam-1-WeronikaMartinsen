function showError(message) {
  const errorContainer = document.querySelector(".carousel");

  if (errorContainer) {
    errorContainer.innerHTML = `<h3>Error: ${message}</h3>`;
  } else {
  }
}
const url = "https://www.rainy-days.no/wp-json/wp/v2/posts/?per_page=30";

export async function getPosts() {
  const response = await fetch(url);
  const result = await response.json();

  if (response.ok) {
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
      <span>${post.date}</span>
      <div class="imgDiv"><a href="html/blog-specific.html?id=${post.id}&title=${post.title.rendered}"><img class="postImg" src="${post.jetpack_featured_media_url}"></a></div>
        <h5>${post.title.rendered}</h5>
                    
      `;
      carouselContainer.appendChild(postCard);
    });
    const carousel = document.querySelector(".carousel");
    const prevButton = document.getElementById("slide-arrow-prev");
    const nextButton = document.getElementById("slide-arrow-next");
    const numVisiblePosts = 4;
    let currentSlide = 0;

    prevButton.addEventListener("click", () => {
      if (currentSlide > 0) {
        currentSlide--;
        updateCarouselView();
      }
    });

    nextButton.addEventListener("click", () => {
      if (currentSlide < Math.ceil(posts.length / numVisiblePosts) - 1) {
        currentSlide++;
        updateCarouselView();
      }
    });

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
displayPosts();
