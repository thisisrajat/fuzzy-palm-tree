import React, { Component } from "react";
import withWebSocketSubscription from "./with_websocket_subscription";

class UpvoteButton extends Component {
  handleClick = async (e) => {
    e.preventDefault();

    const { id, upvote, active, websocketClient } = this.props;

    fetch(`/api/comment/${id}/upvote`, {
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
        websocketClient.send(
          JSON.stringify({
            action: "COMMENT_TOGGLE",
            id,
            voter_id: window.config.userId,
          })
        );
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

export default withWebSocketSubscription(UpvoteButton);
