import React from 'react';
import { useParams } from 'react-router-dom';
import CommChat from './commChat';

const CommChatWrapper = () => {
  const { receiverId } = useParams();
  return <CommChat receiverId={receiverId} />;
};

export default CommChatWrapper;
