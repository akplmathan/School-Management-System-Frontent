import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from 'react-redux'
import store from './redux/store/store';
import {SnackbarProvider} from 'notistack'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
<Provider store={store}>
    <App />
    </Provider>
</SnackbarProvider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

