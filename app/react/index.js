import React from "react";
import ReactDOM from "react-dom";

import UpvoteButton from "./upvote_button.js";

const upvoteBtnContainerEls = Array.from(
  document.querySelectorAll(".upvote-btn-container")
);

upvoteBtnContainerEls.forEach((upvoteBtnContainerEl) => {
  const { commentId, hasUserVoted, upvote } = upvoteBtnContainerEl.dataset;

  ReactDOM.render(
    <UpvoteButton
      id={parseInt(commentId, 10)}
      active={hasUserVoted === "true"}
      upvote={upvote}
    />,
    upvoteBtnContainerEl
  );
});
