import {
  showError,
  showLoadingIndicator,
  hideLoadingIndicator,
  animateText,
} from "./functions.js";

import { getPosts } from "./api.js";

export async function filterPostsByCategory(categoryId) {
  showLoadingIndicator();
  try {
    const posts = await getPosts();
    const postContainer = document.querySelector(".posts");
    postContainer.innerHTML = "";

    const filteredPosts = posts.filter(
      (post) =>
        Array.isArray(post.categories) && post.categories.includes(categoryId)
    );

    filteredPosts.forEach((post) => {
      let formattedDate = new Date(Date.parse(post.date)).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      );

      const postBlog = document.createElement("div");
      postBlog.className = "post";
      postBlog.innerHTML = `      
        <h2 class="titleDecoration">${post.title.rendered}</h2>
        <span class="date">${formattedDate}</span>
        <div class="postBlogImage"><a class="postImg" href="/html/blog-specific.html?id=${post.id}&title=${post.title.rendered}"><img class="postImage" src="${post.jetpack_featured_media_url}"></a></div>
        <span>${post.excerpt.rendered}</span>
        <span class="excerpt">${post.content.rendered}</span>
        <a class="readMore">Read more...</a>
      `;

      postContainer.appendChild(postBlog);

      const readMore = postBlog.querySelector(".readMore");
      const excerpt = postBlog.querySelector(".excerpt");

      readMore.addEventListener("click", () => {
        if (excerpt.style.display === "none" || excerpt.style.display === "") {
          excerpt.style.display = "block";
          readMore.textContent = "Read less";
        } else {
          excerpt.style.display = "none";
          readMore.textContent = "Read more...";
        }
      });
    });

    hideLoadingIndicator();
  } catch (error) {
    showError("Failed to fetch posts");
  }
}

export async function fetchAndDisplayPosts() {
  showLoadingIndicator();
  try {
    const posts = await getPosts();
    const postContainer = document.querySelector(".posts");

    posts.forEach((post) => {
      let formattedDate = new Date(Date.parse(post.date)).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      );

      const postBlog = document.createElement("div");
      postBlog.className = "post";
      postBlog.innerHTML = `      
      <h2 class="titleDecoration">${post.title.rendered}</h2>
      <span class="biggerDate">${formattedDate}</span>
      <div class="postBlogImage"><a class="postImg" href="/html/blog-specific.html?id=${post.id}&title=${post.title.rendered}"><img class="postImage" src="${post.jetpack_featured_media_url}"></a></div>
      <span>${post.excerpt.rendered}</span>
      <span class="excerpt">${post.content.rendered}</span>
      <a class="readMore">Read more...</a>
      `;

      postContainer.appendChild(postBlog);

      const readMore = postBlog.querySelector(".readMore");
      const excerpt = postBlog.querySelector(".excerpt");

      readMore.addEventListener("click", () => {
        if (excerpt.style.display === "none" || excerpt.style.display === "") {
          excerpt.style.display = "block";
          readMore.textContent = "Read less";
        } else {
          excerpt.style.display = "none";
          readMore.textContent = "Read more...";
        }
      });
    });
    hideLoadingIndicator();
  } catch (error) {
    showError("Failed to fetch or process posts");
  }
}

fetchAndDisplayPosts();
