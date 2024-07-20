import './App.css';
import SignUp from './components/SignUp';
import { AuthProvider } from './context/AuthContext';
import LogIn from './components/LogIn';
import ChatInterface from './components/ChatInterface';
import ChatSettings from './components/ChatSettings';
import { UIProvider } from './context/UIProvider';

function App() {
  return (
    <UIProvider>

      <AuthProvider>
        <ChatInterface />
      </AuthProvider>
    </UIProvider>

  );
}

export default App;
