import { getPosts, displayPosts } from "./api.js";

export async function fetchAndDisplayPosts() {
  try {
    const posts = await getPosts();
    const postContainer = document.querySelector(".posts");

    posts.forEach((post) => {
      console.log(posts);
      console.log(post);
      const postBlog = document.createElement("div");
      postBlog.className = "post";
      postBlog.innerHTML = `      
      <h2 class="titleDecoration">${post.title.rendered}</h2>
      <span>${post.date}</span>
      <div class="postImg"><a class="postImg" href="/html/blog-specific.html?id=${post.id}&title=${post.title.rendered}"><img class="postImage" src="${post.jetpack_featured_media_url}"></a></div>
      <span>${post.excerpt.rendered}</span>
      <span class="excerpt">${post.excerpt.rendered}</span>
      <button class="readMore">Read more...</button>
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
  } catch (error) {
    console.error("Error fetching and displaying posts:", error);
  }
}

fetchAndDisplayPosts();
