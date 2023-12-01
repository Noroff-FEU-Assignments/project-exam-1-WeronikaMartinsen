import {
  showLoadingIndicator,
  hideLoadingIndicator,
  showError,
} from "./functions.js";

import { filterPostsByCategory } from "./blog.js";

const categoriesLink =
  "https://www.rainy-days.no/wp-json/wp/v2/categories/?per_page=30";

async function getCategories() {
  showLoadingIndicator();
  try {
    const response = await fetch(categoriesLink);

    if (!response.ok) {
      throw new Error(`Failed to fetch categories. Status: ${response.status}`);
    }

    const result = await response.json();
    hideLoadingIndicator();
    return result;
  } catch (error) {
    hideLoadingIndicator();
    showError("Failed to fetch posts");
  }
}

async function displayCategories() {
  try {
    const categories = await getCategories();
    const categoriesContainer = document.querySelector(".categories");

    categoriesContainer.innerHTML = "";
    categories.forEach((category) => {
      const categoryList = document.createElement("div");
      categoryList.className = "categoryList";
      categoryList.innerHTML = `<div>
    <ul>
      <li class="category-item" data-category-id="${category.id}">${category.name}</li>
      </ul>
      </div>    
      `;

      categoriesContainer.appendChild(categoryList);

      const categoryItem = categoryList.querySelector(".category-item");
      categoryItem.addEventListener("click", () => {
        const categoryId = category.id;
        filterPostsByCategory(categoryId);
      });
    });
  } catch (error) {
    showError("Failed to fetch posts");
  }
}
displayCategories();
