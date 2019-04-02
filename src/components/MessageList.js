import React, { Component } from "react";
import App from "../App.js";
import RoomList from "./RoomList.js";
//import { runInNewContext } from "vm";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      groupedMessages: [],
      newMessage: ""
    };
    this.messageRef = this.props.firebase.database().ref("messages");
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

  handleChange(e) {
    this.setState({ newMessage: e.target.value });
  }

  componentDidMount() {
    this.messageRef.on("child_added", snapshot => {
      const msg = snapshot.val();
      msg.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(msg) });
    });
  }

  render() {
    return (
      <div>
        <h2>Messages</h2>
      </div>
    );
  }
}

export default MessageList;
