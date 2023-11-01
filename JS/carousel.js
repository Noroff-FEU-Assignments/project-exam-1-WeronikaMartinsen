function showError(message) {
  const errorContainer = document.querySelector(".carousel");

  if (errorContainer) {
    errorContainer.innerHTML = `<h3>Error: ${message}</h3>`;
  } else {
  }
}
const url = "https://www.rainy-days.no/wp-json/wp/v2/posts/";
const carouselContainer = document.querySelector(".carousel");

async function getPosts() {
  try {
    const response = await fetch(url);
    const getResults = await response.json();
    createHTML(getResults);
  } catch (error) {
    console.log(error);
  }
}

getPosts();

function createHTML(posts) {
  console.log(posts);
  posts.forEach(function (post) {
    const postContainer = document.createElement("div");

    console.log(post);
  });
}
carouselContainer.appendChild(postContainer);
