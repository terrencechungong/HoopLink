import './App.css';
import SignUp from './components/SignUp';
import { AuthProvider } from './context/AuthContext';
import LogIn from './components/LogIn';
import ChatInterface from './components/ChatInterface';
import ChatSettings from './components/ChatSettings';

function App() {
  return (
      <AuthProvider>
        <ChatInterface />
      </AuthProvider>
  );
}

export default App;
