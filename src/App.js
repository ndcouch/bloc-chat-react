import React, { Component } from "react";
import "./App.css";
import RoomList from "./components/RoomList.js";
import * as firebase from "firebase";
import MessageList from "./components/MessageList.js";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDqrMVEClnpLUVbHqvBo_6_-HVr2KVEtYQ",
  authDomain: "bloc-chat-react-534f4.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-534f4.firebaseio.com",
  projectId: "bloc-chat-react-534f4",
  storageBucket: "bloc-chat-react-534f4.appspot.com",
  messagingSenderId: "1011495810725"
};
const fb = firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: ""
    };
    this.changeRoom = this.changeRoom.bind(this);
  }

  changeRoom(room) {
    this.setState({ activeRoom: room });
  }

  render() {
    return (
      <div className="App">
        <header />
        <main>
          <div className="app-rooms">
            <RoomList
              firebase={firebase}
              changeRoom={room => this.changeRoom(room)}
            />
          </div>
          <div className="app-msg">
            <MessageList
              firebase={firebase}
              activeRoom={this.state.activeRoom}
            />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
