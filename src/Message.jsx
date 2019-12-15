import React from 'react';

function Message(props) {
    if (props.type === "message"){
      return (
        <div className="message-box">
          {props.username ?
          <p className="sender">{ props.username }</p> : ""}
          <p className="message">{ props.message }</p>
        </div>
      );
    } else {
      return (
        <div className="message-box">
          {props.username ?
          <p className="sender">{ props.username }</p> : ""}
          <p className="message"><img src={ props.message }/></p>
        </div>
      );
    }
}


export default Message;
