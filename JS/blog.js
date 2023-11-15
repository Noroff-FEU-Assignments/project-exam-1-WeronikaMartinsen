import { getPosts, displayPosts } from "./api.js";

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
      const postBlog = document.createElement("div");
      postBlog.className = "post";
      postBlog.innerHTML = `      
        <h2 class="titleDecoration">${post.title.rendered}</h2>
        <span>${post.date}</span>
        <div class="postImg"><a class="postImg" href="/html/blog-specific.html?id=${post.id}&title=${post.title.rendered}"><img class="postImage" src="${post.jetpack_featured_media_url}"></a></div>
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
    console.error("Error fetching and displaying posts:", error);
    hideLoadingIndicator();
  }
}

export async function fetchAndDisplayPosts() {
  showLoadingIndicator();
  try {
    const posts = await getPosts();
    const postContainer = document.querySelector(".posts");

    posts.forEach((post) => {
      console.log(posts);
      const postBlog = document.createElement("div");
      postBlog.className = "post";
      postBlog.innerHTML = `      
      <h2 class="titleDecoration">${post.title.rendered}</h2>
      <span>${post.date}</span>
      <div class="postImg"><a class="postImg" href="/html/blog-specific.html?id=${post.id}&title=${post.title.rendered}"><img class="postImage" src="${post.jetpack_featured_media_url}"></a></div>
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
    console.error("Error fetching and displaying posts:", error);
    hideLoadingIndicator();
  }
}
function showLoadingIndicator() {
  const loading = document.querySelector(".loading");
  loading.innerHTML = `<div class="loading">
    <div class="dot dot1"></div>
    <div class="dot dot2"></div>
    <div class="dot dot3"></div>
  </div>`;
}
function hideLoadingIndicator() {
  const loading = document.querySelector(".loadingIndicator");
  loading.style.display = "none";
}

fetchAndDisplayPosts();
