import React, { Component } from "react";

const WEBSOCKET_OPEN = 1;

const ws = new WebSocket("ws://localhost:3000/ws");

function createSubscription() {
  return new Promise((resolve) => {
    const timer = setInterval(() => {
      if (ws.readyState === WEBSOCKET_OPEN) {
        clearInterval(timer);
        resolve(ws);
      }
    }, 10);
  });
}

export default function withWebSocketSubscription(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        websocketClient: null,
      };
    }

    componentDidMount() {
      createSubscription().then((ws) => {
        this.setState({
          websocketClient: ws,
        });

        ws.addEventListener("message", this.handleMessage);
      });
    }

    componentWillUnmount() {
      const { websocketClient } = this.state;
      websocketClient.removeEventListener("message", this.handleMessage);
      websocketClient.close();
    }

    handleMessage = (event) => {
      let data = {};
      try {
        data = JSON.parse(event.data);
      } catch (err) {
        console.error(err);
      }

      switch (data.action) {
        case "REFRESH_COMMENT_DATA": {
          const incomingCommentId = data.id;

          if (this.props.id === incomingCommentId) {
            this.setState({
              overrideProps: true,
              upvote: data.upvote,
              has_user_voted: data.has_user_voted,
            });
          }

          break;
        }
      }
    };

    getProps = () => {
      const { overrideProps } = this.state;
      if (overrideProps) {
        const { upvote, has_user_voted } = this.state;

        return {
          ...this.props,
          upvote,
          active: has_user_voted,
        };
      }

      return this.props;
    };

    render() {
      const { websocketClient } = this.state;

      return (
        <WrappedComponent
          websocketClient={websocketClient}
          {...this.getProps()}
        />
      );
    }
  };
}
