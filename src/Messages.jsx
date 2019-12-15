import React from 'react';
import Message from './Message.jsx';
import autoscroll from 'autoscroll-react'


class Messages extends React.Component {
    render() {
        return (
            <div id="messages">
                {this.props.messages.map((item, index, arr) => {
                    var prev_item = arr[index - 1];
    
                    if (prev_item && (item[1] === prev_item[1])) {
                        return <Message type={item[0]} message={item[2]} />
                    } else {
                        return <Message type={item[0]} username={item[1]} message={item[2]} />
                    }
                })}
            </div>
        );
    }
}


export default autoscroll(Messages);
