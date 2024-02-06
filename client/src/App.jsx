// importing this allows other page components to be injected into the Outlet component.
import { Outlet } from 'react-router-dom';
// components used in App.jsx (and will carry over to other pages, because this is default component in main.jsx)
import NavBar from './Components/Navbar/Navbar';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// css
import './styles/main.css';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <NavBar />
        <Outlet />
      </ApolloProvider>
    </>
  )
}

export default App;
