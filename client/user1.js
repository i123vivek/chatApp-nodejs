// connecting with sockets.
const socket = io('http://localhost:3000');

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6InhWN3VyUHRXYSIsImlhdCI6MTU1MTUxNjEzNzIxMywiZXhwIjoxNTUxNjAyNTM3LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJJZCI6IlJzU1ZjblM4UyIsImZpcnN0TmFtZSI6InJhaHVsIiwibGFzdE5hbWUiOiJyYWkiLCJlbWFpbCI6Ind4eXpAZ21haWwuY29tIiwibW9iaWxlTnVtYmVyIjo5NDMxNTgzMzU4fX0.sV5RD2i8msVSOEn9tycPuuHYRQht-CzolVtvz--ehLk"
const userId = "RsSVcnS8S"

let chatMessage = {
  createdOn: Date.now(),
  receiverId: 'P16QGfK5M',//putting user2's id here 
  receiverName: "rakesh kr",
  senderId: userId,
  senderName: "rahul rai"
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

  socket.on("typing", (data) => {

    console.log(data+" is typing")
    
    
  });

  $("#send").on('click', function () {

    let messageText = $("#messageToSend").val()
    chatMessage.message = messageText;
    socket.emit("chat-msg",chatMessage)

  })

  $("#messageToSend").on('keypress', function () {

    socket.emit("typing","rahul rai")

  })




}// end chat socket function

chatSocket();
