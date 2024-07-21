import './App.css';
import SignUp from './components/SignUp';
import { AuthProvider } from './context/AuthContext';
import LogIn from './components/LogIn';
import ChatInterface from './components/ChatInterface';
import ChatSettings from './components/ChatSettings';
import FeedPost from './components/FeedPost'
import ViewProfile from './components/ViewProfile';
import Feed from './components/Feed';
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
          <Route path="/post" element={<FeedPost/>} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/viewprofile" element={<ViewProfile/>} />
          <Route path="/feed" element={<Feed/>} />
          <Route path="/chats" element={<ChatInterface />} />
          <Route path="/profile" element={<ViewProfile/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
