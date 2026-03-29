import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  QueryClientProvider,
  queryClient
} from '@/shared/config/queryClient/queryClient.constants';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';

import './styles/App.scss';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
