// Import necessary functions from functions.js
import {
  showError,
  showLoadingIndicator,
  hideLoadingIndicator,
} from "./functions.js";

// Function to extract post ID from the query parameter in the URL
function getPostIdFromQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  return id;
}

/* // Function to extract post title from the query parameter in the URL
function getPostTitleFromQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  const encodedTitle = urlParams.get("title");
  const decodedTitle = decodeURIComponent(encodedTitle);
  return decodedTitle;
}
 */
// Function to fetch a single post using the post ID
async function fetchPosts() {
  showLoadingIndicator();
  const postId = getPostIdFromQuery();
  /* const title = getPostTitleFromQuery(); */
  /* 
  const decodedTitle = decodeURIComponent(title.trim()); */

  if (!postId) {
    throw new Error(`API loading failed. ID not found in the query parameter.`);
  }

  try {
    const response = await fetch(
      `https://www.rainy-days.no/wp-json/wp/v2/posts/${postId}`
    );
    hideLoadingIndicator();
    const singlePost = await response.json();
    if (!response.ok) {
      throw new Error("Fetch jacket with ID failed.");
    }
    /*    const titleContainer = document.getElementById("title");

    titleContainer.textContent = decodedTitle;
    titleContainer.innerHTML = decodedTitle; */

    createHtml(singlePost);
  } catch (error) {
    showError("Failed to fetch posts. Please try again later.");
  }
}

// Function to create HTML content for a single post
function createHtml(post) {
  let formattedDate = new Date(Date.parse(post.date)).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const postContainer = document.querySelector(".postContainer");
  postContainer.innerHTML = `
  <h2 class="titleDecoration widthH1 maxWidth">${post.title.rendered}</h2><span class="biggerDate">${formattedDate}</span>
    <div class="imgDiv">
        <img class="postImg" src="${post.jetpack_featured_media_url}" alt="${post.better_featured_image.alt_text}">
    </div>
    <div class="modal">
    <span><ion-icon  class="close" name="close-outline"></ion-icon></span>
    <div class="modalContent"><img src="" alt="${post.better_featured_image.alt_text}"class="modalImg"/>
    <span class="modalTxt"></span></div></div>
    <span class="widthH1">${post.content.rendered}</span>
    <div class="linkToBlog margin-top">
          <a href="blog.html">Back to blog &rarr;</a
          >
        </div>
  `;
  // Get all images in the post
  const images = document.querySelectorAll(".postImg");
  // Get modal and its components
  const modal = document.querySelector(".modal");
  const modalImg = document.querySelector(".modalImg");
  const modalTxt = document.querySelector(".modalTxt");

  // Add click event listener to close the modal
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("close")) {
      modal.classList.remove("appear");
    }
  });

  // Add click event listeners to images for modal display
  images.forEach((image) => {
    image.addEventListener("click", () => {
      modalImg.src = image.src;
      modalTxt.innerHTML = image.alt;
      modal.classList.add("appear");
    });
  });
}

fetchPosts();
