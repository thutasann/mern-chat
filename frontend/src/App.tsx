import { Route, Routes } from 'react-router-dom';
import ChatPage from './pages/chat';
import HomePage from './pages/home';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/chats' element={<ChatPage/>}/>
    </Routes>
  )
}

export default App