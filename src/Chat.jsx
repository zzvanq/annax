import React from 'react';
import Message from './Message.jsx';
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
        this.socket.on("connect", data => {
            this.socket.emit('new_user', {'username': this.state.username});
        });

        this.socket.on("message", data => {
            this.setState({messages: [...this.state.messages, [data['username'], data['message']]]});
        });

        this.socket.on("auth", (authed) => {
            this.setState(authed ? {authed: authed} : {username: ''});
        });
    }

    handleKeyDown(e) {
        if (e.key === 'Enter' || e.key === 'NumpadEnter') {
            if (this.state.username) {
                this.socket.emit("auth", this.state.username);
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
                <div id="messages">
                    {this.state.messages.map((item, index, arr) => {
                        var prev_item = arr[index - 1];

                        if (prev_item && (item[0] === prev_item[0])) {
                            return <Message message={item[1]} />
                        } else {
                            return <Message username={item[0]} message={item[1]} />
                        }
                    })}
                </div>
                <div id="cli-wrapper">
                    {this.state.authed ? 
                    <Cli socket={this.socket} username={this.state.username} /> :
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
