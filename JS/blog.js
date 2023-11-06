import { getPosts, displayPosts } from "./api.js";

async function fetchAndDisplayPosts() {
  try {
    const posts = await getPosts(); // Fetch posts using your getPosts function
    const postContainer = document.querySelector(".posts");

    posts.forEach((post) => {
      console.log(posts);
      console.log(post);
      const postBlog = document.createElement("div");
      postBlog.className = "post";
      postBlog.innerHTML = `      
      <h2>${post.title.rendered}</h2>
      <div class="postImg"><a href="html/blog-specific.html?id=${post.id}&title=${post.title.rendered}"><img class="postImage" src="${post.jetpack_featured_media_url}"></a></div>
      <span>${post.excerpt.rendered}</span>
      <span>${post.date}</span>
      `;
      postContainer.appendChild(postBlog);
    });
  } catch (error) {
    console.error("Error fetching and displaying posts:", error);
  }
}

fetchAndDisplayPosts();
