import MainPage from "./pages/MainPage/MainPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import {Route, Routes} from "react-router-dom";
import AboutPage from "./pages/AboutPage/AboutPage";
import {useSelector} from "react-redux";

function App() {
    const {userId} = useSelector((state) => state.authReducer)
    return (
        <div className="App">
            <Header userId={userId}/>
            <Routes>
                <Route index element={<MainPage/>}/>
                <Route path="about/:id" element={<AboutPage userId={userId}/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
