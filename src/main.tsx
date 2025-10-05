import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/store.ts'
import { Provider } from 'react-redux'
import { ScreenSizeProvider } from './contexts/ScreenSizeContext.tsx'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <ScreenSizeProvider>

            <Provider store={store}>
                
                <App />
                
            </Provider>
        </ScreenSizeProvider>
       
    </BrowserRouter>

)
