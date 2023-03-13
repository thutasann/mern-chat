import React, { useEffect } from 'react'
import axios from 'axios'

const ChatPage: React.FC = () => {

    const fetchChats = async() => {
        const data = await axios.get("/")
        console.log('data', data)
    }
    useEffect(() => {
        fetchChats();
    }, []);

  return (
    <div>ChatPage</div>
  )
}

export default ChatPage