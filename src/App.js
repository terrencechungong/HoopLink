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
import SingleRunView from './components/SingleRunView';
import SinglePostView from './components/SinglePostView';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {NextUIProvider} from "@nextui-org/react";
import Notifications from './components/Notifications';
import SearchResults from './components/SearchResults';

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:8080/graphql"
  })

  return (
    <NextUIProvider>

      <AuthProvider>
        <ApolloProvider client={client}>
          <Router>
            <Routes>
              <Route path="/post" element={<FeedPost />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/editprofile" element={<EditProfile />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/chats" element={<ChatInterface />} />
              <Route path="/profile" element={<ViewProfile />} />
              <Route path="/single-profile-view" element={< SingleProfileView />} />
              <Route path="/runs-feed" element={<RunsFeed />} />
              <Route path="/single-run-view" element={<SingleRunView />} />
              <Route path="/single-post-view" element={<SinglePostView />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/searchresults/:param" element={<SearchResults/>} />
            </Routes>
          </Router>
        </ApolloProvider>

      </AuthProvider>
    </NextUIProvider>
  );
}

export default App;
