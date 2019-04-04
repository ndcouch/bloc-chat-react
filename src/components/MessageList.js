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
    this.handleChange = this.handleChange.bind(this);
    this.createMessage = this.createMessage.bind(this);
  }

  createMessage(e) {
    e.preventDefault();
    const newMsg = this.state.newMessage;
    this.messageRef.push({
      //username: this.props.currentUser,
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

  getMessages() {
    this.setState({
      groupedMessages: this.state.messages.filter(
        message => message.room === this.props.activeRoom.key
      )
    });
  }

  render() {
    return (
      <div className="messageList">
        <h2 className="main-header">Title</h2>
        {this.state.groupedMessages.map(message => (
          <div className="message" key={message.key}>
            <p className="content">{message.content}</p>
            <p className="username">{message.username}</p>
            <p className="sentAt">Sent at: {message.sentAt}</p>
          </div>
        ))}

        <div id="message-form">
          <form onSubmit={e => this.createMessage(e)}>
            <input
              id="message-field"
              type="text"
              value={this.state.newMessage}
              onChange={e => this.handleChange(e)}
            />
            <button id="message-btn" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>

      /*<div>
        <h2>Messages</h2>
        <form onSubmit={e => this.createMessage(e)}>
          <label>New Message</label>
          <input
            type="text"
            value={this.state.newMessage}
            onChange={e => this.handleChange(e)}
          />
          <input type="submit" />
        </form>
      </div>*/
    );
  }
}

export default MessageList;
