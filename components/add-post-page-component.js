import { renderUploadImageComponent } from "./upload-image-component";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    const appHtml = `
    <div class="page-container">
      <div class="header-container">
        <div class="page-header">
            <h1 class="logo">instapro</h1>
            <button class="header-button add-or-login-button">
              <div title="Добавить пост" class="add-post-sign"></div>
            </button>
            <button title="dasha111" class="header-button logout-button">Выйти</button>  
        </div>
      </div>
      <div class="form">
        <h3 class="form-title">Добавить пост</h3>
        <div class="form-inputs">
          <div class="upload-image-container"></div>
          <label>
            Опишите фотографию:
            <textarea class="input textarea" rows="4"></textarea>
          </label>
          <button class="button" id="add-button">Добавить</button>
        </div>
      </div>
    </div>
  `;

    appEl.innerHTML = appHtml;

    let imageUrl = "";

    const onImageUrlChange = (str) => {
      imageUrl = str;
    };

    const imageContainer = document.querySelector(".upload-image-container");

    renderUploadImageComponent({ element: imageContainer, onImageUrlChange });

    document.getElementById("add-button").addEventListener("click", () => {
      const text = document.querySelector(".textarea");

      if (!imageUrl) {
        alert("Нет фотографии");
        return;
      }

      if (!text.value.length) {
        alert("Введите текст");
        return;
      }

      onAddPostClick({
        description: `${text.value}`,
        imageUrl,
      });
    });
  };

  render();
}
