import './App.css';
import SignUp from './components/SignUp';
import { AuthProvider } from './context/AuthContext';
import LogIn from './components/LogIn';
import ChatInterface from './components/ChatInterface';
import ChatSettings from './components/ChatSettings';
import FeedPost from './components/FeedPost'
import ViewProfile from './components/ViewProfile';
import RunsFeed from './components/RunsFeed';
import EditProfile from './components/EditProfile';
import Feed from './components/Feed';
import SingleProfileView from './components/SingleProfileView';
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
          <Route path="/editprofile" element={<EditProfile/>} />
          <Route path="/feed" element={<Feed/>} />
          <Route path="/chats" element={<ChatInterface />} />
          <Route path="/profile" element={<ViewProfile />} />
          <Route path="/single-profile-view" element={< SingleProfileView />} />
          <Route path="/runs-feed" element={<RunsFeed/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
