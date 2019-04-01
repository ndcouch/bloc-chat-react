import React, { Component } from "react";
import App from "../App.js";
//import { runInNewContext } from "vm";

/*handleclick() {} //click on rooms

componentdidmount() {} //probably 
*/
class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      groupedMessages: [],
      newMessage: ""
    };
    this.messageReg = this.props.firebase.database().ref("messages");
  }

  createMessage(e) {
    e.preventDefault();
    const newMsg = this.state.newMessage;
    this.messageRef.push({
      username: this.props.currentUser.displayName,
      content: newMsg,
      roomId: this.props.activeRoom,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
    });
    this.setState({ newMessage: "" });
  }
}
