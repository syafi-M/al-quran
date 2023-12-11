import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import IndexQuran from "./pages/alquran/indexSurah";
import ErrorPage from "./pages/error";
import Dashboard from "./pages/dashboard";
import MainLayout from "./layout/mainLayout";

function App() {
    return (
        <>
            <div>
                <Router>
                    <Routes>
                        <Route path="/alquran" element={<MainLayout />}></Route>
                        <Route
                            path="/alquran/surah/:id"
                            element={<MainLayout />}
                        ></Route>
                        <Route path="*" element={<ErrorPage />}></Route>
                        <Route path="/" element={<Dashboard />}></Route>
                    </Routes>
                </Router>
            </div>
        </>
    );
}

export default App;
