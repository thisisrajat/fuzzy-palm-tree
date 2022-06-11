function handleCommentSubmit({ container = document }) {
  const inputEl = container.querySelector(".js-comment-input");

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
      parent_comment_id:
        container?.dataset?.parentId &&
        parseInt(container.dataset.parentId, 10),
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
    handleCommentSubmit({});
  }
}

function handleReplyInput(e) {
  if (e.key === "Enter" && e.target.classList.contains("js-comment-input")) {
    e.preventDefault();
    handleCommentSubmit({ container: e.target.parentElement });
  }
}

function handleReplyClick(event) {
  const commentEl = event.target.closest(".js-comment");
  const formEl = document.createElement("div");
  formEl.dataset.parentId = commentEl.dataset.id;
  formEl.innerHTML = document.querySelector(".js-comment-form").innerHTML;
  formEl.classList = "comment-reply-form js-comment-reply-form";

  const body = commentEl.nextElementSibling;

  if (body.childNodes.length === 0) {
    body.appendChild(formEl);
  }
}

function handleCommentClick(event) {
  if (event.target.classList.contains("js-reply-btn")) {
    event.preventDefault();
    return handleReplyClick(event);
  }
  if (event.target.classList.contains("js-comment-submit")) {
    event.preventDefault();
    return handleCommentSubmit({ container: event.target.parentElement });
  }
}

window.addEventListener("load", function () {
  // Click on the submit button
  document
    .querySelector(".js-comment-submit")
    .addEventListener("click", handleCommentSubmit);

  // Capture Enter keypress to submit
  document
    .querySelector(".js-comment-input")
    .addEventListener("keypress", handleInput);

  // Click on the reply button
  document
    .querySelector(".js-comment-block")
    .addEventListener("click", handleCommentClick);

  // Keypress on the reply form
  document
    .querySelector(".js-comment-block")
    .addEventListener("keypress", handleReplyInput);

  timeago.render(document.querySelectorAll("time"));
});
