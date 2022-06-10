import React, { Component } from "react";

class UpvoteButton extends Component {
  handleClick = async (e) => {
    e.preventDefault();

    const commentId = this.props.id;

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
  };

  render() {
    const { id, upvote, active } = this.props;
    const classNames = `upvote-btn js-upvote-btn ${active ? "active" : ""}`;

    return (
      <a
        href="#"
        data-comment-id={id}
        className={classNames}
        onClick={this.handleClick}
      >
        <span class="upvote_icon">▲</span>Upvote {upvote ? `(${upvote})` : ""}
      </a>
    );
  }
}

export default UpvoteButton;
