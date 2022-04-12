
import "./css/common.css"
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar'

function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element=""></Route>
                <Route path="/about_us" element=""></Route>
                <Route path="/login" element=""></Route>
                <Route path="/search" element=""></Route>
                <Route path="/user" element=""></Route>
                <Route path="/playlist" element=""></Route>
                <Route path="/result" element=""></Route>
                <Route path="/signup" element=""></Route>
                <Route path="/signup-2fa" element=""></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
