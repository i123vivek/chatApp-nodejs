// connecting with sockets.
const socket = io('http://localhost:3000');

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IjZ2ZWo3TFVlMCIsImlhdCI6MTU1MTUxNjQ4MTI1NywiZXhwIjoxNTUxNjAyODgxLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJJZCI6IlAxNlFHZks1TSIsImZpcnN0TmFtZSI6InJha2VzaCIsImxhc3ROYW1lIjoia3IiLCJlbWFpbCI6InJha2VzaDFAZ21haWwuY29tIiwibW9iaWxlTnVtYmVyIjo5NDMxNTgyMTU4fX0.zkK2AWNnE8-U8S3rCtElCJZPFCfipqFR6584tzdSQkg"
const userId= "P16QGfK5M"

let chatMessage = {
  createdOn: Date.now(),
  receiverId: 'RsSVcnS8S',//putting user2's id here 
  receiverName: "rahul rai",
  senderId: userId,
  senderName: "rakesh kr"
}

let chatSocket = () => {

  socket.on('verifyUser', (data) => {

    console.log("socket trying to verify user");

    socket.emit("set-user", authToken);

  });

  socket.on(userId, (data) => {

    console.log("you received a message from "+data.senderName)
    console.log(data.message)

  });

  socket.on("online-user-list", (data) => {

    console.log("Online user list is updated. some user can online or went offline")
    console.log(data)

  });


  $("#send").on('click', function () {

    let messageText = $("#messageToSend").val()
    chatMessage.message = messageText;
    socket.emit("chat-msg",chatMessage)

  })

  $("#messageToSend").on('keypress', function () {

    socket.emit("typing","rakesh kr")

  })

  socket.on("typing", (data) => {

    console.log(data+" is typing")
    
    
  });



}// end chat socket function

chatSocket();
