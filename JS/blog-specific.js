import {
  showError,
  showLoadingIndicator,
  hideLoadingIndicator,
} from "./functions.js";

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
  showLoadingIndicator();
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
    hideLoadingIndicator();
    const singlePost = await response.json();
    if (!response.ok) {
      console.error("Failed to fetch the single post.");
      throw new Error("Fetch jacket with ID failed.");
    }
    const titleContainer = document.getElementById("title");
    titleContainer.textContent = title;
    createHtml(singlePost);
  } catch (error) {
    showError("Failed to fetch posts. Please try again later.");
  }
}

function createHtml(post) {
  let formattedDate = new Date(Date.parse(post.date)).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  console.log(post);
  const postContainer = document.querySelector(".postContainer");
  postContainer.innerHTML = `
  <h1 class="titleDecoration widthH1 maxWidth">${post.title.rendered}</h1><span class="biggerDate">${formattedDate}</span>
    <div class="imgDiv">
        <img class="postImg" src="${post.jetpack_featured_media_url}" alt="${post.better_featured_image.alt_text}">
    </div>
    <div class="modal">
    <span><ion-icon  class="close" name="close-outline"></ion-icon></span>
    <div class="modalContent"><img src="" alt="${post.better_featured_image.alt_text}"class="modalImg"/>
    <span class="modalTxt"></span></div></div>
    <span class="widthH1">${post.content.rendered}</span>
    <div class="linkToBlog">
          <a href="blog.html">Back to blog &rarr;</a
          >
        </div>
  `;

  const images = document.querySelectorAll(".postImg");
  const modal = document.querySelector(".modal");
  const modalImg = document.querySelector(".modalImg");
  const modalTxt = document.querySelector(".modalTxt");

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("close")) {
      console.log("Close button clicked!");
      modal.classList.remove("appear");
    }
  });

  images.forEach((image) => {
    image.addEventListener("click", () => {
      modalImg.src = image.src;
      modalTxt.innerHTML = image.alt;
      modal.classList.add("appear");
    });
  });
}

fetchPosts();
