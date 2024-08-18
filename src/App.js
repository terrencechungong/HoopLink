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
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import {NextUIProvider} from "@nextui-org/react";
import Notifications from './components/Notifications';
import SearchResults from './components/SearchResults';

function App() {
  const httpLink = new HttpLink({
    uri: 'http://localhost:8080/graphql',
  });
  
  const wsLink = new GraphQLWsLink(
    createClient({
      url: 'ws://localhost:8080/subscriptions',
    }),
  );

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    httpLink,
  );

  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
  });

// WebSocket link for subscriptio

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
              <Route path="/chat/:chatId" element={<ChatInterface />} />
              <Route path="/profile" element={<ViewProfile />} />
              <Route path="/myprofile/:authId" element={< SingleProfileView />} />
              <Route path="/runs-feed" element={<RunsFeed />} />
              <Route path="/single-run-view" element={<SingleRunView />} />
              <Route path="/viewpost/:postId" element={<SinglePostView />} />
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
