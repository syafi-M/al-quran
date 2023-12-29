import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ErrorPage from "./pages/error";
import Dashboard from "./pages/dashboard";
import MainLayout from "./layout/mainLayout";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

function App() {
    const [fadeIn, setFadeIn] = useState(false);
    useEffect(() => {
        setFadeIn(true);
    }, []);

    const animatedMainLayout = (
        <motion.div
            key="surah"
            initial={{ opacity: 0 }}
            animate={{ opacity: fadeIn ? 1 : 0 }} // Animate opacity based on fadeIn state
            transition={{ duration: 0.5 }}
        >
            <MainLayout />
        </motion.div>
    );

    return (
        <div>
            <Router>
                <AnimatePresence initial={false} mode="wait">
                    <Routes>
                        <Route
                            path="/alquran/surah"
                            element={animatedMainLayout}
                        />
                        <Route
                            path="/alquran/surah/:id"
                            element={animatedMainLayout}
                        />

                        <Route path="*" element={<ErrorPage />} />
                        <Route path="/" element={<Dashboard />} />
                    </Routes>
                </AnimatePresence>
            </Router>
        </div>
    );
}

export default App;
