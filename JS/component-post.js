import {
  showLoadingIndicator,
  hideLoadingIndicator,
  showError,
} from "./functions.js";

import { getPosts } from "./api.js";

export async function displayLatestPosts() {
  showLoadingIndicator();
  const url = "https://www.rainy-days.no/wp-json/wp/v2/posts/?per_page=3";

  try {
    const posts = await getPosts(url);
    const componentContainer = document.querySelector(
      ".new-component-container"
    );

    hideLoadingIndicator(); // Move this here to ensure it's called regardless of the response

    if (posts && posts.length > 0) {
      posts.slice(0, 3).forEach((post) => {
        createCard(post, componentContainer);
      });
    } else {
      showError("No posts found");
    }
  } catch (error) {
    showError("Failed to fetch posts");
  }
}

function createCard(post, container) {
  const formattedDate = new Date(Date.parse(post.date)).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
  const postCard = document.createElement("div");
  postCard.className = "post-card";

  postCard.innerHTML = `
  <a href="/html/blog-specific.html?id=${post.id}&title=${post.title.rendered}">
    <h2 class="date">${formattedDate}</h2>
    <div class="componentImage">
      <img alt="${post.better_featured_image_alt_text}" src="${post.jetpack_featured_media_url}">
    </div>
    <div>
      <h5>${post.title.rendered}</h5>
    </div>
  </a>
`;

  container.appendChild(postCard);
}
displayLatestPosts();
