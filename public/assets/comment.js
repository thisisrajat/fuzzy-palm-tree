function handleCommentSubmit() {
  const inputEl = document.querySelector(".js-comment-input");

  if (!inputEl) {
    throw new Error("Input is not available");
  }

  if (!inputEl.value) {
    return;
  }

  fetch("/api/comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      comment: inputEl.value,
      user_id: window.config.userId,
    }),
  })
    .then((res) => res.json())
    .then(() => {
      window.location.href = window.location.href;
    })
    .catch((error) => {
      console.error(error);
    });
}

function handleUpvote(e) {
  e.preventDefault();

  const commentId = e.target.dataset.commentId;

  if (!commentId) {
    throw new Error("Comment ID is required");
  }

  fetch(`/api/comment/${commentId}/upvote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      user_id: window.config.userId,
    }),
  })
    .then((res) => res.json())
    .then(() => {
      window.location.href = window.location.href;
    })
    .catch((error) => {
      console.error(error);
    });
}

function handleInput(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    handleCommentSubmit();
  }
}

window.addEventListener("load", function () {
  // Click on the submit button
  document
    .querySelector(".js-comment-submit")
    .addEventListener("click", handleCommentSubmit);

  // Click on the upvote button
  document
    .querySelectorAll(".js-upvote-btn")
    .forEach((el) => el.addEventListener("click", handleUpvote));

  // Capture Enter keypress to submit
  document
    .querySelector(".js-comment-input")
    .addEventListener("keypress", handleInput);
});
