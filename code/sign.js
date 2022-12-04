/** saves comments into local storage */
function commentSave() {
  localStorage.setItem("comment", JSON.stringify(savedComments));
}

/** loads saved comments from local storage or creates empty object */
function loadComments() {
  savedComments = JSON.parse(localStorage.getItem("comment")) || [];
}
loadComments();

const userAvatar = document.querySelector(".user-avatar");
const userAvatarInput = document.getElementById("user-avatar-input");
const fileName = document.getElementById("file-name");

// removes, error from avatar input, reads file's location on user's pc and attaches image to avatar box with file's name
userAvatarInput.addEventListener("change", (e) => {
  emptyAvatarError.style.display = "none";
  const fileReader = new FileReader();

  // doesn't allow files over 100Kb to prevent occurring too fast "The quota has been exceeded" error on default browser setting (Mozilla)
  if (e.target.files[0].size > 100000) {
    emptyAvatarError.style.display = "block";
    emptyAvatarError.textContent = "file cannot be over 100Kb";
    return;
  }

  avatarUpload(fileReader);

  fileName.textContent = `File name: ${e.target.files[0].name}`;
});

/**creates img element from user's file and appends it to avatar box */
function avatarUpload(chosenFile) {
  chosenFile.addEventListener("load", () => {
    avatarDisplayReset();
    const uploadedAvatar = chosenFile.result;

    const userImg = document.createElement("img");
    userImg.src = uploadedAvatar;
    userImg.id = "user-img";

    userAvatar.appendChild(userImg);
  });
  chosenFile.readAsDataURL(userAvatarInput.files[0]);
}

/**removes avatar upon selecting another one */
function avatarDisplayReset() {
  if (userAvatar.firstChild) {
    userAvatar.removeChild(userAvatar.firstChild);
  }
}

const signUpButton = document.getElementById("sign-up-btn");
const usernameInput = document.getElementById("username-input");
const userPasswordInput = document.getElementById("user-password-input");
const UsernameError = document.querySelector(".empty-username-error");
const emptyPasswordError = document.querySelector(".empty-password-error");
const emptyAvatarError = document.querySelector(".empty-avatar-error");
let validUsername = false;
let validPassword = false;
let validAvatar = false;

// checks for correct user field inputs and displays errors accordingly
// if no errors then user data is stored inside "savedComments.savedUsers" and login page opens
signUpButton.addEventListener("click", () => {
  UsernameError.style.display = "none";
  emptyPasswordError.style.display = "none";
  emptyAvatarError.style.display = "none";

  usernameCheck();

  if (userPasswordInput.value == "") {
    emptyPasswordError.style.display = "block";
    validPassword = false;
  } else {
    validPassword = true;
  }
  if (userAvatar.firstChild == "" || userAvatar.firstChild == null) {
    emptyAvatarError.style.display = "block";
    emptyAvatarError.textContent = "Please select avatar";
    validAvatar = false;
  } else {
    validAvatar = true;
  }

  if (validUsername && validPassword && validAvatar) {
    const userImg = document.getElementById("user-img");

    const newUserToInject = {
      userID: getNewID(),
      image: {
        png: userImg.src,
        webp: userImg.src,
      },
      username: usernameInput.value,
      password: userPasswordInput.value,
    };

    savedComments[0].savedUsers.push(newUserToInject);
    commentSave();

    location.href = "./login.html";
  }

  /**creates new unique ID for a new user. Returns new ID number */
  function getNewID() {
    const userIDsArray = [];
    savedComments[0].savedUsers.forEach((savedUser) => {
      userIDsArray.push(savedUser.userID);
    });

    return Math.max(...userIDsArray) + 1;
  }

  /**checks for already existing usernames and displays errors accordingly. Return true if username is not taken */
  function usernameCheck() {
    if (usernameInput.value == "") {
      UsernameError.style.display = "block";
      UsernameError.textContent = "cannot be empty";
      validUsername = false;
    } else {
      savedComments[0].savedUsers.forEach((savedUser) => {
        if (savedUser.username == usernameInput.value) {
          UsernameError.style.display = "block";
          UsernameError.textContent = "username already taken";
          validUsername = false;
        } else {
          validUsername = true;
        }
      });
    }
  }
});

// removes error on change
userPasswordInput.addEventListener("change", () => {
  emptyPasswordError.style.display = "none";
});

// removes error on change
usernameInput.addEventListener("change", () => {
  UsernameError.style.display = "none";
});
