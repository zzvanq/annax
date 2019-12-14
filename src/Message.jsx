import React from 'react';

function Message(props) {
    return (
      <div className="message-box">
          {props.username ?
          <p className="sender">{ props.username }</p>:""}
          <p className="message">{ props.message }</p>
      </div>
    );
}


export default Message;
