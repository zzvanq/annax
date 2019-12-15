import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

var giphy = require('giphy-api')("klB9Zf4zKSuscH45CuLzPuibmMidihzg");


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
            stickers: [],
            visible: false
        };

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.handleClickOut = this.handleClickOut.bind(this);
        this.handleGlobalKeyDown = this.handleGlobalKeyDown.bind(this);
        this.searchSticker = this.searchSticker.bind(this);
        this.handleImageClick = this.handleImageClick.bind(this);

        this.COMMANDS_SERVER = {
            "войти": "join",
            "создать": "join",
            "стикер": "sticker",
            "enter": "join",
            "create": "create",
            "sticker": "sticker"
        };
        this.COMMANDS = Object.keys(this.COMMANDS_SERVER);
        this.SEARCH_TIMEOUT = 400;

        this.stickerSearchTimeout = null;
    }

    componentDidMount() {
        window.addEventListener("keydown", this.handleGlobalKeyDown);
    }

    searchSticker(text) {
        if (text) {
            giphy.search({
                api: 'stickers',
                limit: 6,
                q: text
            }).then(res => {
                if (res.meta.status === 200)
                    this.setState({stickers: res.data.map(i => i.images.fixed_width_small.url)});
            });
        }
    }

    sendMessage(e) {
        if (e.target.value[0] === "/") {
            var command_title = e.target.value.slice(1, e.target.value.length).split(" ");
            var command = this.COMMANDS_SERVER[command_title[0]];

            if (command === "sticker") {
                this.props.socket.send({'type': 'sticker', 'username': this.props.username, 'message': this.state.stickers[0], 'room': this.props.room});
                this.setState({text: '', predicted_end: '', stickers: [], visible: false});
            } else {
                var arg = command_title.slice(1).join(' ');

                this.props.socket.emit(command, {'username': this.props.username, 'arg': arg});
                this.setState({text: '', predicted_end: '', visible: false});
            }
        } else {
            if (this.state.text.replace(/ /g, "")) {
                this.props.socket.send({'type': 'message', 'username': this.props.username, 'message': this.state.text, 'room': this.props.room});
                this.setState({text: '', predicted_end: '', visible: false});
            }
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
            var args = e.target.value.split(" ");
            var text = args[0].slice(1);
            var most_simillar = arrayOfMostSimillar(text, this.COMMANDS)[0];
            var diff = "";
            var is_sticker = this.COMMANDS_SERVER[text] === "sticker";

            if (most_simillar)
                diff = most_simillar.split(text).join("");

                if(!diff && is_sticker)
                    clearTimeout(this.stickerSearchTimeout);
                    this.stickerSearchTimeout = setTimeout(() => this.searchSticker(args.slice(1).join(" ")), this.SEARCH_TIMEOUT, args);

            if (!is_sticker) {
                this.setState({text: e.target.value, predicted_end: diff, stickers: []});
            } else {
                this.setState({text: e.target.value, predicted_end: diff});
            } 
        } else {
            this.setState({text: e.target.value, predicted_end: "", stickers: []});
        }
    }

    handleClickOut(e) {
        this.setState({visible: false});
    }

    handleGlobalKeyDown(e) {
        if (!this.state.visible && !(e.key === 'Enter' || e.key === 'NumpadEnter')) {
            this.setState({visible: true});
            this._textAreaRef._ref.focus();
        }
    }

    handleImageClick (e) {
        var src = e.target.src;

        if (src) {
            this.props.socket.send({'type': 'sticker', 'username': this.props.username, 'message': src, 'room': this.props.room});
            this.setState({text: '', predicted_end: '', stickers: [], visible: false});
        }
    }

    getTextAreaRef = node => { this._textAreaRef = node };

    render() {
        return (
            <div className={ !this.state.visible ? "disable" : "" }>
                <div onClick={this.handleClickOut} className={ !this.state.visible ? "disable cli-outarea" : "cli-outarea" }></div>
                <div className="cli-input-wrapper">
                    <div className="predicted-end-wrapper">
                        <p><span className="hidden predicted-placeholder">{this.state.text}</span><span className={this.state.predicted_end ? "predicted-text" : "hidden predicted-text"} >{this.state.predicted_end}</span></p>
                    </div>
                    <TextareaAutosize value={this.state.text} ref={this.getTextAreaRef} autoFocus maxlength="255" onChange={this.handleChange} onKeyDown={this.handleKeyDown} className="cli" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
                    <div className={!this.state.stickers.length ? "disable stickers-wrapper" : "stickers-wrapper"}>
                        {this.state.stickers.map(sticker => {
                            return <img onClick={this.handleImageClick} src={sticker}></img>
                        })}
                        <div className="clearfix"></div>
                    </div>
                </div>
            </div>
        );
    } 
}


export default Cli;
