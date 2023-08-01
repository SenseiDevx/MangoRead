import MainPage from "./pages/MainPage/MainPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import {Route, Routes} from "react-router-dom";
import AboutPage from "./pages/AboutPage/AboutPage";

function App() {
    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route index element={<MainPage/>}/>
                <Route path="about/:id" element={<AboutPage/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
