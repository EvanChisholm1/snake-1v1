import '../styles/globals.css';
import { SocketProvider } from '../components/socketContext';

function MyApp({ Component, pageProps }) {
  return (
    <SocketProvider>
      <Component {...pageProps} />
    </SocketProvider>
  );
}

export default MyApp;
