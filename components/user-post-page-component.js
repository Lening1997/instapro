import { POSTS_PAGE, USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { goToPage } from "../index.js";
import { formatDistanceToNow } from "date-fns";
import { likePost, dislikePost } from "../api.js";

const formatDate = (date) => {
  const [day] = date.split("T");
  const [year, month, days] = day.split("-");

  return formatDistanceToNow(new Date(year, month, days), { addSuffix: true });
};

const counterLikes = (likes) => {
  if (likes.length === 0) {
    return `0`;
  }

  if (likes.length === 1) {
    return `${likes[0].name}`;
  }

  if (likes.length > 1) {
    return `${likes[0].name} и еще ${likes.length - 1}`;
  }
};

export function renderUserPostsPageComponent({ appEl, posts }) {
  const userHeaderHtml = `
  <div class="page-container">
      <div class="header-container"></div>
      <div class="posts-user-header">
          <img src="${posts[0].user.imageUrl}" class="posts-user-header__user-image">
          <p class="posts-user-header__user-name">
              ${posts[0].user.name}
          </p>
      </div>
    </div>
  `;

  const postsHtml = posts.map((post, index) => {
    return `
                <div class="header-container"></div>
                <ul class="posts">

                  <li class="post">
                    <div class="post-header" data-user-id="${
                      post.user.id
                    }"></div>
                    
                    <div class="post-image-container">
                      <img class="post-image" src="${post.user.imageUrl}">
                    </div>
                    <div class="page-container">
                        <div class="post-likes">
                        <button data-liked="${post.isLiked}" data-post-id="${
      post.id
    }" class="like-button">
                            <img src="./assets/images/like${
                              !post.isLiked ? "-not" : ""
                            }-active.svg">
                        </button>
                        <p class="post-likes-text">
                            Нравится: <strong>${counterLikes(
                              post.likes
                            )}</strong>
                        </p>
                        </div>
                        <p class="post-text">
                        <span class="user-name">${post.user.name}</span>
                        ${post.description}
                        </p>
                        <p class="post-date">
                        ${formatDate(post.createdAt)}
                        </p>
                    </div>
                  </li>
                </ul>`;
  });

  appEl.innerHTML = userHeaderHtml + postsHtml;

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
        ? dislikePost(id).then(() =>
            goToPage(USER_POSTS_PAGE, {
              userId: userEl.dataset.userId,
            })
          )
        : likePost(id).then(() =>
            goToPage(USER_POSTS_PAGE, {
              userId: userEl.dataset.userId,
            })
          );
    });
  }
}
