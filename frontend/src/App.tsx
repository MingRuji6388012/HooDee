import "./bootstrap-5.1.3-dist/css/bootstrap.min.css";
// import "./bootstrap-5.1.3-dist/js/bootstrap.bundle.min.js";
import "./css/common.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar';
import AboutUsPage from './page/about_us';
import SearchPage from './page/search';
import ResultPage from './page/result';
import UserPage from './page/user';
import LoginPage from './page/login';
import SignUpPage from './page/signup';
import SignUp2FAPage from './page/signup-2fa';
import HomePage from "./page/home";
import PlaylistPage from "./page/playlist";
import EditPage from "./page/edit";
import AddPage from "./page/add";
// import DomainSelection from "./component/DomainSelection"
// import Navbar_user from "./component/Navbar";


function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/login" element={<LoginPage/>}></Route>
                <Route path="/search" element={<SearchPage/>}></Route>
                <Route path="/user" element={<UserPage/>}></Route>
                <Route path="/playlist" element={<PlaylistPage/>}></Route>
                <Route path="/result" element={<ResultPage/>}></Route>
                <Route path="/signup" element={<SignUpPage/>}></Route>
                <Route path="/signup-2fa" element={<SignUp2FAPage/>}></Route>
                <Route path="/add" element={<AddPage/>}></Route>
                <Route path="/edit" element={<EditPage/>}></Route>
                <Route path="/about_us" element={<AboutUsPage/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
