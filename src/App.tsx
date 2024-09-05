import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/header/header';
import Home from './Pages/Home';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Header />
        <Home />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
