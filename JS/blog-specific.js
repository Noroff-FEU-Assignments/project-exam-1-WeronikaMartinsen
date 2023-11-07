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
  console.log(post);
  const postContainer = document.querySelector(".postContainer");
  postContainer.innerHTML = `
  <h1 class="titleDecoration widthH1">${post.title.rendered}</h1>
    <div class="imgDiv">
        <img class="postImg" src="${post.jetpack_featured_media_url}" alt="${post.better_featured_image.alt_text}">
    </div>
    <div class="modal">
    <span class="close"><ion-icon name="close-outline"></ion-icon></span>
    <div class="modalContent"><img src="" alt="${post.better_featured_image.alt_text}"class="modalImg"/>
    <span class="modalTxt"></span></div></div>
    <span class="widthH1">${post.content.rendered}</span>
    <span>${post.date}</span>
   
  `;

  const images = document.querySelectorAll(".postImg");
  const modal = document.querySelector(".modal");
  const modalImg = document.querySelector(".modalImg");
  const modalTxt = document.querySelector(".modalTxt");
  const close = document.querySelector(".close");

  images.forEach((image) => {
    image.addEventListener("click", () => {
      modalImg.src = image.src;
      modalTxt.innerHTML = image.alt;
      modal.classList.add("appear");

      close.addEventListener("click", () => {
        modal.classList.remove("appear");
      });
    });
  });
}

fetchPosts();
