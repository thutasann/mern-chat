import { Route, Routes } from 'react-router-dom';
import ChatPage from './pages/chat';
import HomePage from './pages/home';
import { useFetch } from 'baroque-hooks';

const App = () => {
	const { data, loading, error } = useFetch('');

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
		</Routes>
	);
};

export default App;
