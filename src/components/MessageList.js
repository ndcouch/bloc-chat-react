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

  componentDidMount() {
    this.messageRef.on("child_added", snapshot => {
      const msg = snapshot.val();
      msg.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(msg) });
    });
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  createMessage(e) {
    e.preventDefault();
    const newMsg = this.state.newMessage;
    this.messageRef.push({
      username: "username here",
      content: newMsg,
      roomId: this.props.activeRoom,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
    });
    this.setState({ newMessage: "" });
  }

  handleChange(e) {
    this.setState({ newMessage: e.target.value });
  }

  render() {
    return (
      <div>
        <h2>Messages</h2>
        {this.state.messages
          .filter(message => message.roomId === this.props.activeRoom)
          .map(message => (
            <div className="message" key={message.key}>
              <p className="content">{message.content}</p>
              <p className="sentAt">Sent at: {message.sentAt}</p>
            </div>
          ))}

        <div>
          <form onSubmit={e => this.createMessage(e)}>
            <input
              id="msg-text-field"
              type="text"
              value={this.state.newMessage}
              onChange={e => this.handleChange(e)}
            />
            <button id="submit-msg-button" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default MessageList;
