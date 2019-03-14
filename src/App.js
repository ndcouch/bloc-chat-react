import React, { Component } from "react";
import "./App.css";
import RoomList from "./components/RoomList.js";
import * as firebase from "firebase";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDqrMVEClnpLUVbHqvBo_6_-HVr2KVEtYQ",
  authDomain: "bloc-chat-react-534f4.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-534f4.firebaseio.com",
  projectId: "bloc-chat-react-534f4",
  storageBucket: "bloc-chat-react-534f4.appspot.com",
  messagingSenderId: "1011495810725"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>This gonna be a chat app</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
