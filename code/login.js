/** saves comments into local storage */
function commentSave() {
  localStorage.setItem("comment", JSON.stringify(savedComments));
}

/** loads saved comments from local storage or creates empty object */
function loadComments() {
  savedComments = JSON.parse(localStorage.getItem("comment")) || [];
}
loadComments();

const loginButton = document.getElementById("login-btn");
const usernameInput = document.getElementById("username-input");
const userPasswordInput = document.getElementById("user-password-input");
const loginErrors = document.querySelectorAll(".login-error");

// resets errors display, validates username and password -> if correct, user is saved into "savedComments" as "currentUser"
// if not correct -> displays errors
loginButton.addEventListener("click", () => {
  loginErrors.forEach((loginError) => {
    loginError.style.display = "none";
  });

  savedComments[0].savedUsers.forEach((savedUser) => {
    if (savedUser.username == usernameInput.value && savedUser.password == userPasswordInput.value) {
      savedComments[0].currentUser = {
        userID: savedUser.userID,
        image: {
          png: savedUser.image.png,
          webp: savedUser.image.webp,
        },
        username: savedUser.username,
        password: savedUser.password,
      };
      commentSave();
      location.href = "./index.html";
    } else {
      loginErrors.forEach((loginError) => {
        loginError.style.display = "block";
      });
    }
  });
});

// removes errors on change
usernameInput.addEventListener("change", () => {
  loginErrors.forEach((loginError) => {
    loginError.style.display = "none";
  });
});

// removes errors on change
userPasswordInput.addEventListener("change", () => {
  loginErrors.forEach((loginError) => {
    loginError.style.display = "none";
  });
});
