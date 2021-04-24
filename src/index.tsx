import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {QueryClient, QueryClientProvider} from 'react-query';
import 'bootstrap/dist/css/bootstrap.min.css';

const client = new QueryClient()

ReactDOM.render(
  <QueryClientProvider client = {client}>
    <App />
  </QueryClientProvider>,
  document.getElementById('root')
);
