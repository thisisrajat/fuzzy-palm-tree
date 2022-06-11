const uuid = require("uuid").v4;
const WebSocket = require("ws");

const CommentDataService = require("../services/comment_data_service");

async function getWebsocketData(data, selfConnection) {
  switch (data.action) {
    case "COMMENT_TOGGLE": {
      const commentId = data.id;
      const userId = data.voter_id;

      const [commentData] = await CommentDataService.buildData({
        userId,
        commentId,
      });

      // Since we're sending comment data to all clients, we need to make sure
      // that we include the self vote only on the same connection.
      if (!selfConnection) {
        delete commentData.has_user_voted;
      }

      return {
        action: "REFRESH_COMMENT_DATA",
        ...commentData,
      };
      break;
    }
  }
}

function websocketRoutes(app, expressWs) {
  app.ws("/ws", (ws, req) => {
    ws.on("message", async function (msg) {
      const websocketServer = expressWs.getWss();

      let data = {};

      try {
        data = JSON.parse(msg);
      } catch (err) {
        console.error(err);
      }

      for (const client of websocketServer.clients) {
        const sendData = await getWebsocketData(data, client === ws);
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(sendData));
        }
      }
    });
  });
}

module.exports = websocketRoutes;
