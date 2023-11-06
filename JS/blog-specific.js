function getPostIdFromQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  return id;
}

function getPostTitleFromQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("title");
}

async function fetchPosts() {
  const postId = getPostIdFromQuery();
  const title = getPostTitleFromQuery();
  if (!postId) {
    console.log(postId);
    throw new Error(`API loading failed. ID not found in the query parameter.`);
  }

  try {
    const response = await fetch(
      `https://www.rainy-days.no/wp-json/wp/v2/posts/${postId}`
    );
    const singlePost = await response.json();
    if (!response.ok) {
      console.error("Failed to fetch the single post.");
      throw new Error("Fetch jacket with ID failed.");
    }
    const titleContainer = document.getElementById("title");
    titleContainer.textContent = title;
    createHtml(singlePost);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

function createHtml(post) {
  const postContainer = document.querySelector(".postContainer");
  postContainer.innerHTML = `
  <h1 class="titleDecoration widthH1">${post.title.rendered}</h1>
    <div class="imgDiv">
        <img class="postImg" src="${post.jetpack_featured_media_url}">
    </div>
    <span class="widthH1">${post.excerpt.rendered}</span>
    <span>${post.date}</span>
   
  `;
}

fetchPosts();
