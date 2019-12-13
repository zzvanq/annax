import React from 'react';


class Cli extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        };

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage() {
        this.props.socket.send({'username': this.props.username, 'message': this.state.text});
        this.setState({'text': ''});
    }

    handleKeyDown(e) {
        if (!e.shiftKey) {
            if (e.key === 'Enter' || e.key === 'NumpadEnter') {
                this.sendMessage();
            }
        }
    }

    handleChange(e) {
        this.setState({'text': e.target.value});
    }

    render() {
        return (
            <div className="message-box">
                <input type="text" value={this.state.text} onChange={this.handleChange} onKeyDown={this.handleKeyDown} className="cli" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
            </div>
        );
    } 
}


export default Cli;
