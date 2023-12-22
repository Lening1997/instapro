export function saveUserToLocalStorage(user) {
  window.localStorage.setItem("user", JSON.stringify(user));
}

export function getUserFromLocalStorage(user) {
  try {
    return JSON.parse(window.localStorage.getItem("user"));
  } catch (error) {
    return null;
  }
}

export function removeUserFromLocalStorage(user) {
  window.localStorage.removeItem("user");
}

export function cleanHtml(htmlString) {
  if (htmlString.length) {
    const noSpecialCharacters = htmlString.replace(
      /[@!^&\/\\#,+()$~%.'":*?<>{}]/g,
      ""
    );

    return noSpecialCharacters;
  } else {
    return "";
  }
}
