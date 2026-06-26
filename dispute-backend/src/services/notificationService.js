const axios = require("axios");

const sendTeamsNotification = async (
  dispute,
  accessToken
) => {
  try {

    console.log(
      "Notification for:",
      dispute.assigneeEmail
    );

    console.log(
      "Token Received:",
      !!accessToken
    );

    const meResponse =
      await axios.get(
        "https://graph.microsoft.com/v1.0/me",
        {
          headers: {
            Authorization:
              `Bearer ${accessToken}`,
          },
        }
      );

    console.log(
      "Logged In User:",
      meResponse.data
    );
    const assigneeResponse =
      await axios.get(
        `https://graph.microsoft.com/v1.0/users/${dispute.assigneeEmail}`,
        {
          headers: {
            Authorization:
              `Bearer ${accessToken}`,
          },
        }
      );

    console.log(
      "Assignee User:",
      assigneeResponse.data
    );
    const chatResponse =
      await axios.post(
        "https://graph.microsoft.com/v1.0/chats",
        {
          chatType: "oneOnOne",
          members: [
            {
              "@odata.type":
                "#microsoft.graph.aadUserConversationMember",
              roles: ["owner"],
              "user@odata.bind":
                `https://graph.microsoft.com/v1.0/users/${meResponse.data.id}`,
            },
            {
              "@odata.type":
                "#microsoft.graph.aadUserConversationMember",
              roles: ["owner"],
              "user@odata.bind":
                `https://graph.microsoft.com/v1.0/users/${assigneeResponse.data.id}`,
            },
          ],
        },
        {
          headers: {
            Authorization:
              `Bearer ${accessToken}`,
            "Content-Type":
              "application/json",
          },
        }
      );

    console.log(
      "Chat Created:",
      chatResponse.data
    );
    await axios.post(
      `https://graph.microsoft.com/v1.0/chats/${chatResponse.data.id}/messages`,
      {
        body: {
          contentType: "html",
          content: `
<b>🎫 New Dispute Assigned</b><br><br>

<b>Ticket Number</b><br>
${dispute.ticketNumber}<br><br>

<b>Customer Code</b><br>
${dispute.customerCode}<br><br>

<b>Invoice</b><br>
${dispute.invoice}<br><br>

<b>Priority</b><br>
${dispute.priority}<br><br>

<b>Reason Code</b><br>
${dispute.reasonCode}<br><br>

Please review the dispute and take the necessary action.
`
        }
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("Message Sent Successfully");

  } catch (error) {

    console.log("========== ERROR ==========");

    console.log(error);

    console.log("Status:",
      error.response?.status
    );

    console.log("Data:",
      JSON.stringify(
        error.response?.data,
        null,
        2
      )
    );

    console.log("Message:",
      error.message
    );

  }
};

module.exports = {
  sendTeamsNotification,
};