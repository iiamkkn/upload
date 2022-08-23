import React, { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

const ENDPOINT =
  window.location.host.indexOf('localhost') >= 0
    ? 'http://127.0.0.1:5000'
    : window.location.host;

export default function ChatBox(props) {
  const { userInfo } = props;
  const [socket, setSocket] = useState(null);
  const uiMessagesRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messageBody, setMessageBody] = useState('');
  const [messages, setMessages] = useState([
    { name: 'Support', body: 'Hello there, Please ask your question.' },
  ]);

  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.clientHeight,
        left: 0,
        behavior: 'smooth',
      });
    }
    if (socket) {
      socket.emit('onLogin', {
        _id: userInfo._id,
        name: userInfo.name,
        isAdmin: userInfo.isAdmin,
      });
      socket.on('message', (data) => {
        setMessages([...messages, { body: data.body, name: data.name }]);
      });
    }
  }, [messages, isOpen, socket, userInfo._id, userInfo.name, userInfo.isAdmin]);

  const supportHandler = () => {
    setIsOpen(true);
    console.log(ENDPOINT);
    const sk = socketIOClient(ENDPOINT);
    setSocket(sk);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      alert('Please type message. Empty message cannot be sent.');
    } else {
      setMessages([...messages, { body: messageBody, name: userInfo.name }]);
      setMessageBody('');
      setTimeout(() => {
        socket.emit('onMessage', {
          body: messageBody,
          name: userInfo.name,
          isAdmin: userInfo.isAdmin,
          _id: userInfo._id,
        });
      }, 1000);
    }
  };
  const closeHandler = () => {
    setIsOpen(false);
  };
  return (
    <div className="chatbox">
      {!isOpen ? (
        <button type="button" onClick={supportHandler}>
          <i className="fa fa-support" />
        </button>
      ) : (
        <div className="card card-body-chat">
          <div className="row">
            <button className="chat-support-btn">
              Have a problem? Chat with our support team.{' '}
            </button>
            <button
              className="fas-close-btn"
              type="button"
              onClick={closeHandler}
            >
              <i className="fa fa-close" />
            </button>
          </div>
          <ul ref={uiMessagesRef}>
            {messages.map((msg, index) => (
              <li key={index}>
                <strong>{`${msg.name}: `}</strong> {msg.body}
              </li>
            ))}
          </ul>
          <div>
            <form onSubmit={submitHandler} className="row">
              <input
                className="chat-input-support"
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
                type="text"
                placeholder="type your message"
              />
              <button type="submit" className="chat-send-btn">
                <SendOutlinedIcon />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
