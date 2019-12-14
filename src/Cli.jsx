import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';


function arrayOfMostSimillar(text, arr) {
    var new_arr = arr.filter(item => item.startsWith(text))
    return new_arr.sort((a, b) => {
        return a.length - b.length || // sort by length, if equal then
               a.localeCompare(b);    // sort by dictionary order
    });
}


class Cli extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            predicted_end: '',
            visible: false
        };

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.handleClickOut = this.handleClickOut.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleGlobalKeyDown = this.handleGlobalKeyDown.bind(this);

        this.COMMANDS_SERVER = {"войти": "join", "создать": "create", "стикер": "sticker"};
        this.COMMANDS = Object.keys(this.COMMANDS_SERVER);
    }

    componentDidMount() {
        window.addEventListener("keydown", this.handleGlobalKeyDown);
    }

    sendMessage(e) {
        if (e.target.value[0] === "/") {
            var text = e.target.value.slice(1, e.target.value.length).split(" ");
            var command = this.COMMANDS_SERVER[text[0]];
            var arg = text.slice(1).join(' ');

            this.props.socket.emit(command.trim(), arg);
            this.setState({text: '', predicted_end: '', visible: false});
        } else {
            this.props.socket.send({'username': this.props.username, 'message': this.state.text});
            this.setState({text: '', predicted_end: '', visible: false});
        }
    }

    handleKeyDown(e) {
        if (!e.shiftKey) {
            if (this.state.predicted_end) {
                if (e.key === 'Enter' || e.key === 'NumpadEnter' || e.key === 'Tab') {
                    this.setState({text: this.state.text + this.state.predicted_end + " ", predicted_end: ""});
                    e.preventDefault();
                }
            } else {
                if (e.key === 'Enter' || e.key === 'NumpadEnter') {
                    this.sendMessage(e);
                    e.preventDefault();
                } else if (e.key === 'Tab')
                    e.preventDefault();
            }
        }
    }

    handleChange(e) {
        if (e.target.value[0] === "/") {
            var text = e.target.value.slice(1, e.target.value.length);
            var most_simillar = arrayOfMostSimillar(text, this.COMMANDS)[0];
            var diff = "";

            if (most_simillar)
                diff = most_simillar.split(text).join("");

            this.setState({text: e.target.value, predicted_end: diff});
        } else {
            this.setState({text: e.target.value, predicted_end: ""});
        }
    }

    handleClickOut(e) {
        this.setState({visible: false});
    }

    handleGlobalKeyDown(e) {
        if (!this.state.visible && !(e.key === 'Enter' || e.key === 'NumpadEnter')) {
            this.setState({visible: true});
        }
    }

    handleBlur(e) {
        e.target.focus();
    }

    render() {
        return (
            <div className={ !this.state.visible ? "hidden" : "" }>
                <div onClick={this.handleClickOut} className={ !this.state.visible ? "disable cli-outarea" : "cli-outarea" }></div>
                <div className="cli-input-wrapper">
                    <div className={this.state.predicted_end ? "predicted-end-wrapper" : "hidden predicted-end-wrapper" }>
                        <p><span className="hidden predicted-placeholder">{this.state.text}</span><span className="predicted-text">{this.state.predicted_end}</span></p>
                    </div>
                    <TextareaAutosize value={this.state.text} onBlur={this.handleBlur} autoFocus maxlength="255" onChange={this.handleChange} onKeyDown={this.handleKeyDown} className="cli" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
                </div>
            </div>
        );
    } 
}


export default Cli;
