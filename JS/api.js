function showError(message) {
  const errorContainer = document.querySelector(".carousel");

  if (errorContainer) {
    errorContainer.innerHTML = `<h3>Error: ${message}</h3>`;
  } else {
  }
}
const url = "https://www.rainy-days.no/wp-json/wp/v2/posts/";
const singlePost = "https://www.rainy-days.no/wp-json/wp/v2/pages/";

async function getPosts() {
  const response = await fetch(url);
  const result = await response.json();

  if (response.ok) {
    return result;
  } else {
    throw new Error("Failed to fetch!");
  }
}
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const title = params.get("title");
const singlePostId = url + id;

async function fetchPost() {
  const response = await fetch(singlePostId);
  const result = await response.json();
  return result;
}

async function displayPosts() {
  try {
    const posts = await getPosts();
    const carouselContainer = document.querySelector(".carousel");

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
  } catch (error) {
    showError("Failed to fetch posts");
  }
}
displayPosts();
