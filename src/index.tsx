import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import App from './App';
import { ToastContainer } from 'react-toastify';

import './Style/index.css'
import 'remixicon/fonts/remixicon.css'
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <BrowserRouter>
        <Provider store={store} >
            <ToastContainer
                theme="dark"
                position="top-center"
                autoClose={2000}
                closeOnClick
                pauseOnHover={false}
            />
            <App />
        </Provider>
    </BrowserRouter>
)