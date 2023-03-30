import ReactDOM from 'react-dom/client';
import './index.css';
import { ChatProvider } from './context/chat-provider';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import { Provider } from 'react-redux';
import Store from './store/store';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);
root.render(
	<Provider store={Store}>
		<ChakraProvider>
			<Router>
				<ChatProvider>
					<App />
				</ChatProvider>
			</Router>
		</ChakraProvider>
	</Provider>,
);
