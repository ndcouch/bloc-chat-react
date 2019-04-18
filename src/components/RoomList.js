import React, { Component } from "react";
import App from "../App.js";

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoom: ""
    };

    this.roomsRef = this.props.firebase.database().ref("rooms");
    this.handleChange = this.handleChange.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }

  componentWillMount() {
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  createRoom(e) {
    e.preventDefault();
    this.roomsRef.push({ name: this.state.newRoom });
    this.setState({ newRoom: "" });
  }

  // submit button
  handleClick(e) {
    e.preventDefault();
    const newRoom = { newRoom: this.state.newRoom };
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ newRoom: e.target.value });
  }

  render() {
    return (
      <div>
        <h2>Rooms</h2>
        {this.state.rooms.map(room => (
          <div key={room.key}>
            <button onClick={() => this.props.changeRoom(room)}>
              {room.name}
            </button>
          </div>
        ))}
        <form onSubmit={e => this.handleClick(e)}>
          <input
            type="text"
            value={this.state.newRoom}
            onChange={e => this.handleChange(e)}
          />
          <button onClick={this.createRoom}>Submit</button>
        </form>
      </div>
    );
  }
}

export default RoomList;
