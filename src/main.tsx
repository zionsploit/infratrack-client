import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@mantine/charts/styles.css';
import '@mantine/core/styles.css';

import App from './App.tsx'
import { BrowserRouter } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './provider/queryClient.ts';
import { Provider } from 'react-redux';
import store from './provider/reduxStore.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
  </StrictMode>,
)
