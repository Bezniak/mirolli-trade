import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import {ROUTES} from "./config/routes.js";
import NotFound from "./components/NotFound/NotFound.jsx";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import AboutUs from "./components/AboutUs/AboutUs.jsx";
import PortfolioContainer from "./components/Portfolio/PortfolioContainer.jsx";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy.jsx";
import Services from "./components/Services/Services.jsx";
import Service from "./components/Services/Service.jsx";
import ContactsPage from "./components/ContactsPage/ContactsPage.jsx";
import Faq from "./components/FAQ/Faq.jsx";
import Book from "./components/Book/Book.jsx";


const Layout = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar/>
            <div className="flex-grow-1">
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};


const App = () => {
    const router = createBrowserRouter([
        {
            path: ROUTES.HOME,
            element: <Layout/>,
            errorElement: <NotFound/>,
            children: [
                {
                    path: ROUTES.HOME,
                    element: <Home/>
                },
                {
                    path: ROUTES.NOT_FOUND,
                    element: <NotFound/>
                },
                {
                    path: ROUTES.ABOUT_US,
                    element: <AboutUs/>
                },
                {
                    path: ROUTES.PORTFOLIO,
                    element: <PortfolioContainer/>
                },
                {
                    path: ROUTES.PRIVACY_POLICY,
                    element: <PrivacyPolicy/>
                },
                {
                    path: ROUTES.SERVICES,
                    element: <Services/>
                },
                {
                    path: ROUTES.SERVICE,
                    element: <Service/>
                },
                {
                    path: ROUTES.CONTACTS,
                    element: <ContactsPage/>
                },
                {
                    path: ROUTES.FAQ,
                    element: <Faq/>
                },
                {
                    path: ROUTES.BOOK,
                    element: <Book/>
                },
            ]
        },
    ]);

    return (
        <div>
            <RouterProvider router={router}/>
        </div>
    );
};

export default App;