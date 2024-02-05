// importing this allows other page components to be injected into the Outlet component.
import { Outlet } from 'react-router-dom';
// components used in App.jsx (and will carry over to other pages, because this is default component in main.jsx)
import NavBar from './Components/Navbar/Navbar';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Canvas } from '@react-three/fiber'
// css
import './styles/main.css';
import Experience from './Components/Three/Experience';

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

function Light({ brightness, color }) {
  <rectAreaLight
    width={5}
    height={5}
    color={color}
    intensity={brightness}
  />
}

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
        {/* <Canvas>
          <Light brightness={20} color={'#ff0000'} />
          <Experience />
        </Canvas> */}
      </ApolloProvider>
    </>
  )
}

export default App;
