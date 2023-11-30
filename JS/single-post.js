import {
  showLoadingIndicator,
  hideLoadingIndicator,
  showError,
  animateText,
} from "./functions.js";

document.addEventListener("DOMContentLoaded", function () {
  const textElement = document.getElementById("animatedTextSingle");
  const textContent = "Parenthood posts";

  animateText(textElement, textContent);
});

const singlePostUrl = "https://www.rainy-days.no/?rest_route=/wp/v2/posts/82";
const singlePostUrl2 = "https://www.rainy-days.no/?rest_route=/wp/v2/posts/68";

async function getPost() {
  showLoadingIndicator();
  try {
    const response = await fetch(singlePostUrl);
    const result = await response.json();
    if (response.ok) {
      hideLoadingIndicator();
      return result;
    } else {
      throw new Error("Fail to fetch");
    }
  } catch {
    showError("Fail to fetch post!");
    throw error;
  }
}
async function displayPost() {
  showLoadingIndicator();
  try {
    const post = await getPost();
    const singlePostContainer = document.querySelector(".singlePost");

    singlePostContainer.innerHTML = "";
    singlePostContainer.innerHTML = `<div class="postHomePage" id="postHomePageSection">
    <div class="firstBox">
    <h3 class="marginBottom">${post.title.rendered}</h3>
    <a href="/html/blog-specific.html?id=${post.id}&title=${post.title.rendered}"><img class="postImage" src="${post.jetpack_featured_media_url}"></a></div>
    <div class="secondBox">
    <span>${post.excerpt.rendered}</span>
    <span class="italic">"This post changed my life. I think every mom should read it."</span>
  <div><ion-icon id="star" name="star"></ion-icon><ion-icon id="star" name="star"></ion-icon><ion-icon id="star" name="star"></ion-icon><ion-icon id="star" name="star"></ion-icon><ion-icon id="star"name="star"></ion-icon></div></div>
    </div>`;
    hideLoadingIndicator();
  } catch (error) {
    showError("Failed to fetch posts. Please try again later.");
  }
}
async function getPost2() {
  showLoadingIndicator();
  try {
    const response = await fetch(singlePostUrl2);
    const result = await response.json();
    if (response.ok) {
      hideLoadingIndicator();
      return result;
    } else {
      throw new Error("Fail to fetch");
    }
  } catch {
    showError("Fail to fetch post!");
    throw error;
  }
}

async function displayPost2() {
  showLoadingIndicator();
  try {
    const post = await getPost2();
    const singlePostContainer2 = document.querySelector(".singlePost2");

    singlePostContainer2.innerHTML = "";
    singlePostContainer2.innerHTML = `<div class="postHomePage postHomePage2" id="postHomePageSection">
      <div class="firstBox">
        <h3 class="marginBottom">${post.title.rendered}</h3>
        <a href="/html/blog-specific.html?id=${post.id}&title=${post.title.rendered}">
          <img class="postImage" src="${post.jetpack_featured_media_url}">
        </a>
      </div>
      <div class="secondBox">
        <span>${post.excerpt.rendered}</span>
        <span class="italic">"Very good guide post!"</span>
        <div>
          <ion-icon id="star" name="star"></ion-icon>
          <ion-icon id="star" name="star"></ion-icon>
          <ion-icon id="star" name="star"></ion-icon>
          <ion-icon id="star" name="star"></ion-icon>
          <ion-icon id="star" name="star"></ion-icon>
        </div>
      </div>
    </div>`;
  } catch (error) {
    showError("Failed to fetch the second post. Please try again later.");
  }
}

displayPost();
displayPost2();
