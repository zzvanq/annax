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
            this.setState({messages: [[data['username'], data['message']], ...this.state.messages]});
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
                <div id="cli-wrapper">
                    {this.state.authed ? 
                    <Cli socket={this.socket} username={this.state.username} /> :
                    <input type="text" onChange={this.handleChange} onKeyDown={this.handleKeyDown} id="login" value={this.state.username}/>
                    }
                </div>
                <div id="messages-box">
                    {this.state.messages.map(item => {
                        return <Message username={item[0]} message={item[1]} />
                    })}
                </div>
            </div>
        );
    } 
}


export default Chat;
