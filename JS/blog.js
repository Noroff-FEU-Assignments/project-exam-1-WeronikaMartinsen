import {
  showError,
  showLoadingIndicator,
  hideLoadingIndicator,
} from "./functions.js";

import { getPosts } from "./api.js";

let posts = [];
let displayedPostIds = [];

export async function filterPostsByCategory(categoryId) {
  showLoadingIndicator();
  try {
    posts = await getPosts();
    const postContainer = document.querySelector(".posts");
    postContainer.innerHTML = "";
    displayedPostIds = [];

    const filteredPosts = posts.filter(
      (post) =>
        Array.isArray(post.categories) && post.categories.includes(categoryId)
    );

    // Display filtered posts
    displayPosts(filteredPosts.slice(0, cardLimit));

    hideLoadingIndicator();
    const loadMoreButton = document.getElementById("load-more");
    loadMoreButton.style.display = "none";

    const hideCountPosts = document.getElementById("hide");
    hideCountPosts.style.display = "none";
  } catch (error) {
    showError("Failed to fetch posts");
  }
}

export async function fetchAndDisplayPosts() {
  showLoadingIndicator();
  try {
    posts = await getPosts();
    const postContainer = document.querySelector(".posts");

    // Display initial set of posts
    displayPosts(posts.slice(0, cardLimit));

    hideLoadingIndicator();
  } catch (error) {
    showError("Failed to fetch or process posts");
  }
}

const cardLimit = 10;
const cardIncrease = 4;
let pageCount;
let currentPage = 1;

function displayPosts(postsToDisplay) {
  const postContainer = document.querySelector(".posts");
  postsToDisplay.forEach((post) => {
    if (!displayedPostIds.includes(post.id)) {
      createCard(post, postContainer);
      displayedPostIds.push(post.id);
    }
  });
}

function createCard(post, container) {
  if (displayedPostIds.includes(post.id)) {
    // Skip if the post has already been displayed
    return;
  }

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
  <a href="/html/blog-specific.html?id=${post.id}&title=${post.title.rendered}">
    <h2>${post.title.rendered}</h2>
    <span class="date">${formattedDate}</span>
    <div class="postBlogImage">
      <img class="postImage" src="${post.jetpack_featured_media_url}" alt="${post.title.rendered}">
    </div>
    <span>${post.excerpt.rendered}</span>
    <span class="excerpt">${post.content.rendered}</span>
    <a class="readMore">Read more...</a>
  </a>
`;

  container.appendChild(postBlog);

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
}

window.onload = function () {
  fetchAndDisplayPosts();

  const loadMoreButton = document.getElementById("load-more");
  const cardCountPost = document.getElementById("card-count");

  loadMoreButton.addEventListener("click", () => {
    currentPage += 1;
    addCards(currentPage);
  });

  function addCards(pageIndex) {
    const postContainer = document.querySelector(".posts");

    handleButtonStatus();

    const startRange = (pageIndex - 1) * cardIncrease;
    const endRange = pageIndex * cardIncrease;

    // Track the number of displayed posts
    const displayedPostCount = displayedPostIds.length;

    const newPosts = posts.slice(
      displayedPostCount,
      displayedPostCount + cardIncrease
    );

    // Update the card count
    cardCountPost.innerHTML = displayedPostCount + cardIncrease;

    // Display the new posts
    displayPosts(newPosts);
  }

  function handleButtonStatus() {
    pageCount = Math.ceil(posts.length / cardIncrease);

    if (pageCount === currentPage) {
      loadMoreButton.classList.add("disable");
      loadMoreButton.setAttribute("disabled", true);
    }
  }
};
