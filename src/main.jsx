import {Suspense} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import './18n';
import App from './App.jsx'
import {AuthProvider} from "./context/AuthContext.jsx";
import {Preloader} from "./components/Preloader/Preloader.jsx";
import {ParallaxProvider} from "react-scroll-parallax";
import {HelmetProvider} from "react-helmet-async";


createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <HelmetProvider>
            <Suspense fallback={<Preloader/>}>
                <ParallaxProvider>
                    <App/>
                </ParallaxProvider>
            </Suspense>
        </HelmetProvider>
    </AuthProvider>
)
