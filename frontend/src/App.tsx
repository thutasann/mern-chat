import { Route, Routes } from 'react-router-dom';
import ChatPage from './pages/chat';
import GamePage from './pages/game';
import HomePage from './pages/home';

const App = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={<HomePage />}
			/>
			<Route
				path="/chats"
				element={<ChatPage />}
			/>
			<Route
				path="/games"
				element={<GamePage />}
			/>
		</Routes>
	);
};

export default App;
