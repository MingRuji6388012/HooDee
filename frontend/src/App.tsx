import './App.css';
import "./bootstrap-5.1.3-dist/css/bootstrap.min.css";
import "./css/common.css";
// import "./bootstrap-5.1.3-dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar';
import SearchPage from './page/search';
import ResultPage from './page/result';
import UserPage from './page/user';

function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element=""></Route>
                <Route path="/about_us" element=""></Route>
                <Route path="/login" element=""></Route>
                <Route path="/search" element={<SearchPage/>}></Route>
                <Route path="/user" element={<UserPage/>}></Route>
                <Route path="/playlist" element=""></Route>
                <Route path="/result" element={<ResultPage/>}></Route>
                <Route path="/signup" element=""></Route>
                <Route path="/signup-2fa" element=""></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
