const newPostBox = document.getElementById("new-post-box-picture");
const siteMain = document.querySelector("main");
const newCommentBox = document.querySelector(".comment-box.new");
const newCommentTextarea = document.getElementById("new-comment-textarea");
const submitNewCommentBtn = document.getElementById("submit-new-comment-btn");
const confimationPopup = document.querySelector(".comfimation-popup");
const bgOverlay = document.querySelector(".bg-overlay");
const confirmationBtns = document.querySelectorAll(".confirmation-btn");
const errorMessage = document.querySelector(".error");
const declineBtn = document.getElementById("decline-btn");
const logoutBtn = document.getElementById("logout-btn");

newCommentTextarea.value = "";
let savedUserCommentContainer;

/** saves comments into local storage */
function commentSave() {
  localStorage.setItem("comment", JSON.stringify(savedComments));
}

/** loads saved comments from local storage or creates empty object */
function loadComments() {
  savedComments = JSON.parse(localStorage.getItem("comment")) || [];
}

loadComments();

// if "savedComments" is empty, will create sample comments with logged user "juliusomo". Renders comments.
window.addEventListener("load", () => {
  if (savedComments == "") {
    savedComments.push({
      currentUser: {
        userID: 123,
        image: {
          png: "./code/images/avatars/image-juliusomo.png",
          webp: "./code/images/avatars/image-juliusomo.webp",
        },
        username: "juliusomo",
        password: "1",
      },
      comments: [
        {
          userID: 1,
          content: "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
          createdAt: {
            year: 2022,
            month: 10,
            day: 3,
            hours: 14,
            minutes: 46,
            secods: 0,
          },
          score: {
            scoreNumber: 12,
            scoredPlusBy: [],
            scoredMinusBy: [],
          },
          user: {
            image: {
              png: "./code/images/avatars/image-amyrobson.png",
              webp: "./code/images/avatars/image-amyrobson.webp",
            },
            username: "amyrobson",
          },
          replies: [],
        },
        {
          userID: 2,
          content: "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
          createdAt: {
            year: 2022,
            month: 10,
            day: 18,
            hours: 5,
            minutes: 25,
            secods: 57,
          },
          score: {
            scoreNumber: 5,
            scoredPlusBy: [],
            scoredMinusBy: [],
          },
          user: {
            image: {
              png: "./code/images/avatars/image-maxblagun.png",
              webp: "./code/images/avatars/image-maxblagun.webp",
            },
            username: "maxblagun",
          },
          replies: [
            {
              userID: 3,
              content: "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
              createdAt: {
                year: 2022,
                month: 10,
                day: 26,
                hours: 12,
                minutes: 44,
                secods: 5,
              },
              score: {
                scoreNumber: 4,
                scoredPlusBy: [],
                scoredMinusBy: [],
              },
              replyingTo: "maxblagun",
              user: {
                image: {
                  png: "./code/images/avatars/image-ramsesmiron.png",
                  webp: "./code/images/avatars/image-ramsesmiron.webp",
                },
                username: "ramsesmiron",
              },
            },
            {
              userID: 123,
              content: "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
              createdAt: {
                year: 2022,
                month: 10,
                day: 30,
                hours: 18,
                minutes: 3,
                secods: 1,
              },
              score: {
                scoreNumber: 2,
                scoredPlusBy: [],
                scoredMinusBy: [],
              },
              replyingTo: "ramsesmiron",
              user: {
                image: {
                  png: "./code/images/avatars/image-juliusomo.png",
                  webp: "./code/images/avatars/image-juliusomo.webp",
                },
                username: "juliusomo",
              },
            },
          ],
        },
      ],
      savedUsers: [
        {
          userID: 123,
          image: {
            png: "./code/images/avatars/image-juliusomo.png",
            webp: "./code/images/avatars/image-juliusomo.webp",
          },
          username: "juliusomo",
          password: "1",
        },
      ],
    });

    commentSave();
    renderComments(savedComments[0].comments);
  } else {
    renderComments(savedComments[0].comments);
  }
  displayCurrentUser();
});

/**appends current user avatar to new comment-box */
function displayCurrentUser() {
  const webpSource = document.createElement("source");
  webpSource.srcset = savedComments[0].currentUser.image.webp;
  webpSource.type = "image/webp";

  const pngSource = document.createElement("source");
  pngSource.srcset = savedComments[0].currentUser.image.png;
  pngSource.type = "image/png";

  const currentUserImage = document.createElement("img");
  currentUserImage.src = savedComments[0].currentUser.image.webp;
  currentUserImage.alt = savedComments[0].currentUser.image.png;

  newPostBox.appendChild(webpSource);
  newPostBox.appendChild(pngSource);
  newPostBox.appendChild(currentUserImage);
}

// creates new comment box. Displays error if comment textarea is empty. Saves new comment into local storage
submitNewCommentBtn.addEventListener("click", () => {
  if (newCommentTextarea.value.trim() == "") {
    newCommentBox.appendChild(errorMessage);
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "none";
    const date = new Date();

    const commentToInject = {
      userID: savedComments[0].currentUser.userID,
      content: newCommentTextarea.value.trim(),
      createdAt: {
        year: date.getUTCFullYear(),
        month: date.getUTCMonth(),
        day: date.getUTCDate(),
        hours: date.getUTCHours(),
        minutes: date.getUTCMinutes(),
        secods: date.getUTCSeconds(),
      },
      score: {
        scoreNumber: 0,
        scoredPlusBy: [],
        scoredMinusBy: [],
      },
      user: {
        image: {
          png: savedComments[0].currentUser.image.png,
          webp: savedComments[0].currentUser.image.webp,
        },
        username: savedComments[0].currentUser.username,
      },
      replies: [],
    };

    savedComments[0].comments.push(commentToInject);
    commentSave();
    displayReset();
    renderComments(savedComments[0].comments);

    newCommentTextarea.value = "";
  }
});

/** displays comments saved in local storage */
function renderComments(loadedComments) {
  loadedComments.forEach((savedComment) => {
    const commentBox = document.createElement("div");
    commentBox.classList.add("comment-box");
    commentBox.id = savedComment.userID;
    // adds "reply" class if comment is a reply
    if (savedComment.replies == null) {
      commentBox.classList.add("reply");
    }
    // adds "logged-user-submited" class if ID of logged user is the same as comment ID
    if (savedComments[0].currentUser.userID == commentBox.id) {
      commentBox.classList.add("logged-user-submited");
    }

    // creates "userCommentContainer" if comment isn't a reply. If it is - it's appended to original comment container stored in variable "savedUserCommentContainer"
    if (savedComment.replies != null) {
      const userCommentContainer = document.createElement("div");
      userCommentContainer.classList.add("user-comment-container");

      userCommentContainer.appendChild(commentBox);
      savedUserCommentContainer = userCommentContainer;

      siteMain.insertBefore(userCommentContainer, newCommentBox);
    } else {
      savedUserCommentContainer.appendChild(commentBox);
    }

    const endorsementButtonsContainer = document.createElement("div");
    endorsementButtonsContainer.classList.add("endorsement-buttons");

    const plusButton = document.createElement("button");
    plusButton.classList.add("button-endorsement");

    const plusImage = document.createElement("img");
    plusImage.src = "./code/images/icon-plus.svg";
    plusImage.alt = "plus-img";

    // sets/removes styles on plus/minus buttons and sets/removes users from scoredPlusBy/scoredMinusBy arrays accrodingly. Saves comments
    plusButton.addEventListener("click", () => {
      if (savedComment.score.scoredMinusBy.includes(savedComments[0].currentUser.userID)) {
        const userMinusIndex = savedComment.score.scoredMinusBy.indexOf(savedComments[0].currentUser.userID);
        savedComment.score.scoredMinusBy.splice(userMinusIndex, 1);
        savedComment.score.scoreNumber++;
        commentScore.textContent++;
      }
      if (savedComment.score.scoredPlusBy.includes(savedComments[0].currentUser.userID)) {
        const userPlusIndex = savedComment.score.scoredPlusBy.indexOf(savedComments[0].currentUser.userID);
        savedComment.score.scoredPlusBy.splice(userPlusIndex, 1);
        savedComment.score.scoreNumber--;
        commentScore.textContent--;
        plusButton.style.filter = "unset";
      } else {
        savedComment.score.scoredPlusBy.push(savedComments[0].currentUser.userID);
        savedComment.score.scoreNumber++;
        commentScore.textContent++;
        plusButton.style.filter = "invert(100%) saturate(2000%) hue-rotate(100deg)";
        minusButton.style.filter = "unset";
      }
      commentSave();
    });

    const commentScore = document.createElement("span");
    commentScore.classList.add("comment-score");
    commentScore.textContent = savedComment.score.scoreNumber;

    const minusButton = document.createElement("button");
    minusButton.classList.add("button-endorsement");

    const minusImage = document.createElement("img");
    minusImage.src = "./code/images/icon-minus.svg";
    minusImage.alt = "minus-img";

    // sets/removes styles on plus/minus buttons and sets/removes users from scoredPlusBy/scoredMinusBy arrays accrodingly. Saves comments
    minusButton.addEventListener("click", () => {
      if (savedComment.score.scoredPlusBy.includes(savedComments[0].currentUser.userID)) {
        const userPlusIndex = savedComment.score.scoredPlusBy.indexOf(savedComments[0].currentUser.userID);
        savedComment.score.scoredPlusBy.splice(userPlusIndex, 1);
        savedComment.score.scoreNumber--;
        commentScore.textContent--;
      }
      if (savedComment.score.scoredMinusBy.includes(savedComments[0].currentUser.userID)) {
        const userMinusIndex = savedComment.score.scoredMinusBy.indexOf(savedComments[0].currentUser.userID);
        savedComment.score.scoredMinusBy.splice(userMinusIndex, 1);
        savedComment.score.scoreNumber++;
        commentScore.textContent++;
        minusButton.style.filter = "unset";
      } else {
        savedComment.score.scoredMinusBy.push(savedComments[0].currentUser.userID);
        savedComment.score.scoreNumber--;
        commentScore.textContent--;
        minusButton.style.filter = "invert(100%) saturate(2000%) hue-rotate(300deg)";
        plusButton.style.filter = "unset";
      }
      commentSave();
    });

    // sets styles on plus buttons if user scored them
    if (savedComment.score.scoredPlusBy.includes(savedComments[0].currentUser.userID)) {
      plusButton.style.filter = "invert(100%) saturate(2000%) hue-rotate(100deg)";
    }

    // sets styles on minus buttons if user scored them
    if (savedComment.score.scoredMinusBy.includes(savedComments[0].currentUser.userID)) {
      minusButton.style.filter = "invert(100%) saturate(2000%) hue-rotate(300deg)";
    }

    const commentHeader = document.createElement("header");
    commentHeader.classList.add("comment-header");

    const userAvatar = document.createElement("picture");
    userAvatar.classList.add("user-avatar");

    const webpAvatarSource = document.createElement("source");
    webpAvatarSource.srcset = savedComment.user.image.webp;
    webpAvatarSource.type = "image/webp";

    const pngAvatarSource = document.createElement("source");
    pngAvatarSource.srcset = savedComment.user.image.png;
    pngAvatarSource.type = "image/png";

    const avatarImg = document.createElement("img");
    avatarImg.src = savedComment.user.image.webp;
    avatarImg.alt = savedComment.user.image.png;

    const userName = document.createElement("h4");
    userName.classList.add("username");
    userName.textContent = savedComment.user.username;

    const commentDate = document.createElement("h4");
    commentDate.classList.add("comment-date");
    commentDate.textContent = getCreatedTime(savedComment.createdAt);

    const commentText = document.createElement("p");
    commentText.classList.add("comment-text");
    commentText.textContent = savedComment.content;

    // if comment is a reply adds a username to comment text
    if (savedComment.replies == null) {
      const replyingToUsername = document.createElement("span");
      replyingToUsername.classList.add("replying-to");
      replyingToUsername.textContent = `@${savedComment.replyingTo} `;

      commentText.prepend(replyingToUsername);
    }

    // creates corresponding comment-box layout if comment is or isn't of currently logged user
    if (savedComments[0].currentUser.userID != commentBox.id) {
      const replyButton = document.createElement("button");
      replyButton.classList.add("reply-btn");
      replyButton.textContent = "Reply";

      const replyImg = document.createElement("img");
      replyImg.src = "./code/images/icon-reply.svg";
      replyImg.alt = "reply-img";

      replyButton.prepend(replyImg);
      commentBox.appendChild(replyButton);

      // creates new reply comment-box with all its functionalities
      replyButton.addEventListener("click", () => {
        const replyCommentBoxes = document.querySelectorAll(".comment-box.new.reply");

        // user can have only one reply comment box opened. Closes previous one
        if (replyCommentBoxes.length != 0) {
          replyCommentBoxes.forEach((replyCommentBox) => {
            replyCommentBox.remove();
          });
        }

        const copiedNewCommentBox = newCommentBox.cloneNode(true);
        copiedNewCommentBox.classList.add("reply");
        copiedNewCommentBox.children[1].value = "";

        const userReplyCommentContainer = replyButton.closest(".user-comment-container");
        userReplyCommentContainer.appendChild(copiedNewCommentBox);

        const replyBtn = userReplyCommentContainer.lastChild.children[2];
        replyBtn.value = "REPLY";

        const replyTextArea = userReplyCommentContainer.lastChild.children[1];
        replyTextArea.focus();

        // adds new comment as reply and saves it accordingly
        replyBtn.addEventListener("click", () => {
          if (replyTextArea.value.trim() == "") {
            copiedNewCommentBox.appendChild(errorMessage);
            errorMessage.style.display = "block";
          } else {
            errorMessage.style.display = "none";
            const date = new Date();

            const commentToInject = {
              userID: savedComments[0].currentUser.userID,
              content: replyTextArea.value.trim(),
              createdAt: {
                year: date.getUTCFullYear(),
                month: date.getUTCMonth(),
                day: date.getUTCDate(),
                hours: date.getUTCHours(),
                minutes: date.getUTCMinutes(),
                secods: date.getUTCSeconds(),
              },
              score: {
                scoreNumber: 0,
                scoredPlusBy: [],
                scoredMinusBy: [],
              },
              replyingTo: savedComment.user.username,
              user: {
                image: {
                  png: savedComments[0].currentUser.image.png,
                  webp: savedComments[0].currentUser.image.webp,
                },
                username: savedComments[0].currentUser.username,
              },
            };

            // if user's new reply is to a original comment then it simply adds it to "replies" object array
            // if user's reply is to a comment which is already a reply then it searches through comments to get original "userCommentContainer" and then
            // if comment ID is the same as comment-box ID of "userReplyCommentContainer" then it adds it to "replies" object array of that user
            if (savedComment.replies != null) {
              savedComment.replies.push(commentToInject);
            } else {
              const opCommentID = userReplyCommentContainer.children[0].id;

              savedComments[0].comments.forEach((opComment) => {
                if (opComment.userID == opCommentID) {
                  opComment.replies.push(commentToInject);
                }
              });
            }

            commentSave();
            displayReset();
            renderComments(savedComments[0].comments);
          }
        });
      });
    } else {
      const userOptionsButtonsContainer = document.createElement("div");
      userOptionsButtonsContainer.classList.add("user-options-buttons");

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete-btn");
      deleteBtn.textContent = "Delete";

      const deleteImg = document.createElement("img");
      deleteImg.src = "./code/images/icon-delete.svg";
      deleteImg.alt = "delete-img";

      deleteBtn.prepend(deleteImg);

      // pops up confirmation box if user really wants to delete comment.
      // If yes, it deletes it and updates comments, saves them.
      // If no, closes confimation box.
      deleteBtn.addEventListener("click", () => {
        confimationPopup.classList.add("active");
        bgOverlay.classList.add("active");

        const opCommentID = deleteBtn.closest(".user-comment-container").children[0].id;

        confirmationBtns.forEach((confirmationBtn) => {
          confirmationBtn.addEventListener("click", () => {
            confimationPopup.classList.remove("active");
            bgOverlay.classList.remove("active");
            if (confirmationBtn.id == "decline-btn") {
              return;
            } else {
              // if comment isn't a reply then it simply is filtered out from all of the comments.
              // If comment is a reply then it searches through comments to get original "userCommentContainer" and then
              // if comment ID is the same as comment-box ID of "userReplyCommentContainer" then it is filtered out from comments
              if (savedComment.replies != null) {
                savedComments[0].comments = savedComments[0].comments.filter((eachComment) => eachComment != savedComment);
              } else {
                savedComments[0].comments.forEach((opComment) => {
                  if (opComment.userID == opCommentID) {
                    opComment.replies = opComment.replies.filter((eachComment) => eachComment != savedComment);
                  }
                });
              }
              deleteBtn.closest(".comment-box").remove();
              commentSave();
            }
          });
        });
      });

      const editBtn = document.createElement("button");
      editBtn.classList.add("edit-btn");
      editBtn.textContent = "Edit";

      const editImg = document.createElement("img");
      editImg.src = "./code/images/icon-edit.svg";
      editImg.alt = "edit-img";

      editBtn.prepend(editImg);

      // after clicking edit button, new textarea pops up where user can edit his comment and save it after clicking update button
      editBtn.addEventListener("click", () => {
        commentBox.classList.add("editing");

        const commentEditingTextarea = document.createElement("textarea");
        commentEditingTextarea.id = "comment-editing-textarea";
        commentEditingTextarea.name = "comment-editing";
        commentEditingTextarea.maxLength = 250;

        // if comment that user wants to edit is a reply, he isn't able to change span "replying-to" with a username
        if (savedComment.replies != null) {
          commentEditingTextarea.value = commentText.textContent;
        } else {
          commentEditingTextarea.value = commentText.lastChild.textContent;
        }

        commentBox.appendChild(commentEditingTextarea);

        const updateBtn = document.createElement("button");
        updateBtn.classList.add("update-btn");
        updateBtn.textContent = "UPDATE";

        commentBox.appendChild(updateBtn);

        // updates user's comment (saves comment). If user erased all text, original text he erased is restored
        updateBtn.addEventListener("click", () => {
          commentBox.classList.remove("editing");

          if (commentEditingTextarea.value.trim() == "") {
            return;
          }

          if (savedComment.replies != null) {
            commentText.textContent = commentEditingTextarea.value.trim();
          } else {
            commentText.lastChild.textContent = commentEditingTextarea.value.trim();
          }
          savedComment.content = commentEditingTextarea.value.trim();

          commentSave();
        });

        commentEditingTextarea.focus();
      });

      userOptionsButtonsContainer.appendChild(deleteBtn);
      userOptionsButtonsContainer.appendChild(editBtn);

      commentBox.appendChild(userOptionsButtonsContainer);
    }

    plusButton.prepend(plusImage);
    minusButton.prepend(minusImage);
    endorsementButtonsContainer.appendChild(plusButton);
    endorsementButtonsContainer.appendChild(commentScore);
    endorsementButtonsContainer.appendChild(minusButton);

    userAvatar.appendChild(webpAvatarSource);
    userAvatar.appendChild(pngAvatarSource);
    userAvatar.appendChild(avatarImg);
    commentHeader.appendChild(userAvatar);
    commentHeader.appendChild(userName);
    commentHeader.appendChild(commentDate);

    commentBox.appendChild(endorsementButtonsContainer);
    commentBox.appendChild(commentHeader);
    commentBox.appendChild(commentText);

    // if comment has replies function is run again for these replies
    if (savedComment.replies != "" && savedComment.replies != null) {
      renderComments(savedComment.replies);
    }
  });
}

// closes confirmation box if clicked outside of it
bgOverlay.addEventListener("click", () => {
  declineBtn.click();
});

/**removes all comments from DOM */
function displayReset() {
  const userCommentContainers = document.querySelectorAll(".user-comment-container");

  userCommentContainers.forEach((userCommentContainer) => {
    userCommentContainer.remove();
  });
}

/**returns appriopriate string according to created comment time in UTC in relative to user's current time */
function getCreatedTime(otherUserDate) {
  const fullCommentDate = new Date(Date.UTC(otherUserDate.year, otherUserDate.month, otherUserDate.day, otherUserDate.hours, otherUserDate.minutes, otherUserDate.secods));
  const currentUserDate = new Date();
  const totalHoursAgo = (currentUserDate - fullCommentDate) / 1000 / 60 / 60;
  const currentUserHoursToMidnight = currentUserDate.getHours() + currentUserDate.getMinutes() / 60 + currentUserDate.getSeconds() / 3600;

  // checks if post was made today, yesterday or more days ago
  if (currentUserHoursToMidnight >= totalHoursAgo) {
    return `today @${doubleDigitTime(fullCommentDate.getHours(), fullCommentDate.getMinutes())}`;
  } else if (currentUserHoursToMidnight < totalHoursAgo && totalHoursAgo <= 24) {
    return `yesterday @${doubleDigitTime(fullCommentDate.getHours(), fullCommentDate.getMinutes())}`;
  } else {
    return `${postedDateText(totalHoursAgo)}`;
  }

  /**adds "0" in front of single digit */
  function doubleDigitTime(hours, minutes) {
    if (hours < 10 && minutes < 10) {
      return `0${hours}:0${minutes}`;
    } else if (hours < 10 && minutes > 9) {
      return `0${hours}:${minutes}`;
    } else if (hours > 9 && minutes < 10) {
      return `${hours}:0${minutes}`;
    } else {
      return `${hours}:${minutes}`;
    }
  }

  /**if post was created more than 6 days ago it returns appropriate string */
  function postedDateText(hours) {
    let timeAgo = 1;
    timeAgo = timeAgo + Math.floor(hours / 24);

    if (timeAgo < 7) {
      return `${timeAgo} days ago`;
    } else if (timeAgo >= 7 && timeAgo < 14) {
      timeAgo = Math.floor(timeAgo / 7);
      return `over 1 week ago`;
    } else if (timeAgo >= 14 && timeAgo <= 28) {
      timeAgo = Math.floor(timeAgo / 7);
      return `over ${timeAgo} weeks ago`;
    } else if (timeAgo > 28 && timeAgo <= 60) {
      return "over 1 month ago";
    } else if (timeAgo > 60 && timeAgo <= 365) {
      timeAgo = Math.floor(timeAgo / 30);
      return `over ${timeAgo} months ago`;
    } else {
      return "over a year ago";
    }
  }
}

// removes current user from savedComments, saves and opens login page
logoutBtn.addEventListener("click", () => {
  savedComments[0].currentUser = {};

  commentSave();
});
