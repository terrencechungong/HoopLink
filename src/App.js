import './App.css';
import SignUp from './components/SignUp';
import { AuthProvider } from './context/AuthContext';
import LogIn from './components/LogIn';
import ChatInterface from './components/ChatInterface';
import ChatSettings from './components/ChatSettings';
import ViewProfile from './components/ViewProfile';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/chats" element={<ChatInterface />} />
          <Route path="/profile" element={<ViewProfile/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
