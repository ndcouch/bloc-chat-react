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
    this.createRoom = this.createRoom.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  // creates a new room
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
      <div className="sidebar">
        {this.state.rooms.map(room => (
          <div className="room-list" key={room.key}>
            <button
              id="rooms-button"
              onClick={() => this.props.changeRoom(room)}
            >
              {room.name}
            </button>
          </div>
        ))}
        <form onSubmit={e => this.handleSubmit(e)}>
          <input
            id="submit-field"
            type="text"
            value={this.state.newRoom}
            onChange={e => this.handleChange(e)}
          />
          <button className="btn btn-primary" onClick={this.createRoom}>
            Submit
          </button>
        </form>
      </div>
      /*<div className="list-rooms">
        <h2 className="rooms-header">Rooms</h2>
        <ul>
          {this.state.rooms.map(room => (
            <li key={room.key}>{room.name}</li>
          ))}
        </ul>
        <form onSubmit={e => this.handleClick(e)}>
          <input
            id="submit-text"
            type="text"
            value={this.state.newRoom}
            onChange={e => this.handleChange(e)}
          />
          <button className="submit-button" onClick={this.createRoom}>
            Submit
          </button>
        </form>
      </div>*/
    );
  }
}

export default RoomList;
