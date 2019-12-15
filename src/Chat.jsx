import React from 'react';
import Messages from './Messages.jsx';
import Cli from './Cli.jsx';
import socketIOClient from "socket.io-client";


class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
          endpoint: "",
          username: "",
          room: "Чат",
          authed: false,
          messages: [],
        };
        this.socket = socketIOClient(this.state.endpoint);
        
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.socket.on("message", data => {
            this.setState({messages: [...this.state.messages, [data['type'], data['username'], data['message']]]});
        });

        this.socket.on("auth", (authed) => {
            this.setState(authed ? {authed: authed} : {username: ''});
        });

        this.socket.on("joined", (data) => {
            this.setState({room: data});
        });
    }

    handleKeyDown(e) {
        if (e.key === 'Enter' || e.key === 'NumpadEnter') {
            if (this.state.username) {
                this.socket.emit("auth", {'username': this.state.username, 'room': this.state.room});
            }
        }
    }

    handleChange(e) {
        this.setState({'username': e.target.value});
    }

    render() {
        return (
            <div id="chat">
                <div id="header">
                    <p className="room-title">{this.state.room}</p>
                </div>
                <Messages messages={this.state.messages} />
                <div id="cli-wrapper">
                    {this.state.authed ? 
                    <Cli socket={this.socket} room={this.state.room} username={this.state.username} /> :
                    <div>
                        <div className="login-label">/никнейм </div>
                        <input type="text" className="cli" autoFocus onChange={this.handleChange} onKeyDown={this.handleKeyDown} id="login" value={this.state.username} autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
                    </div>
                    }
                </div>
            </div>
        );
    } 
}


export default Chat;
