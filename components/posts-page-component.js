import { POSTS_PAGE, USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { formatDistanceToNow } from "date-fns";
import { likePost, dislikePost } from "../api.js";

const formatDate = (date) => {
  const [day] = date.split("T");
  const [year, month, days] = day.split("-");

  return formatDistanceToNow(new Date(year, month, days), { addSuffix: true });
};

export function renderPostsPageComponent({ appEl }) {
  const postsHtml = posts.map((post, index) => {
    return `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">

                  <li class="post">
                    <div class="post-header" data-user-id="${post.user.id}">
                        <img src="${
                          post.user.imageUrl
                        }" class="post-header__user-image">
                        <p class="post-header__user-name">${post.user.name}.</p>
                    </div>
                    
                    <div class="post-image-container">
                      <img class="post-image" src="${post.user.imageUrl}">
                    </div>
                    <div class="post-likes">
                      <button data-liked="${post.isLiked}" data-post-id="${
      post.id
    }" class="like-button">
                        <img src="./assets/images/like${
                          !post.isLiked ? "-not" : ""
                        }-active.svg">
                      </button>
                      <p class="post-likes-text">
                        Нравится: <strong>${post.likes.length}</strong>
                      </p>
                    </div>
                    <p class="post-text">
                      <span class="user-name">${post.user.name}</span>
                      ${post.description}
                    </p>
                    <p class="post-date">
                      ${formatDate(post.createdAt)}
                    </p>
                  </li>
                </ul>
              </div>`;
  });

  appEl.innerHTML = postsHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });

    const button = userEl.closest(".post").querySelector(".like-button");

    button.addEventListener("click", () => {
      const id = button.dataset.postId;

      button.dataset.liked === "true"
        ? dislikePost(id).then(() => goToPage(POSTS_PAGE))
        : likePost(id).then(() => goToPage(POSTS_PAGE));
    });
  }
}
