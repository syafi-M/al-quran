import { Link } from "react-router-dom";
import bgWhite from "../assets/bg_white.jpg";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import logoQuran from "../assets/logo_quran.png";
import logoSac from "../assets/sac.png";
import { IoMdInformationCircleOutline } from "react-icons/io";

export default function Dashboard() {
    const [fadeIn, setFadeIn] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const handleModalToggle = () => {
        setShowModal(!showModal);
    };
    useEffect(() => {
        setFadeIn(true);
    }, []);

    const getSurahArrayFromLocalStorage = () => {
        const surahString = localStorage.getItem("noSurah");
        if (surahString) {
            return JSON.parse(surahString);
        }
        return []; // If no array is found in local storage, return an empty array
    };

    const getAyahArrayFromLocalStorage = () => {
        const ayahString = localStorage.getItem("noAyah");
        if (ayahString) {
            return JSON.parse(ayahString);
        }
        return []; // If no array is found in local storage, return an empty array
    };

    const now = new Date();
    const year = now.getFullYear();

    // Usage:
    const surahArray = getSurahArrayFromLocalStorage();
    const ayahArray = getAyahArrayFromLocalStorage();
    return (
        <>
            <div className="relative">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-0 right-0 mt-4 mr-4  text-neutral-800/70 p-2 rounded-full flex items-center"
                    onClick={handleModalToggle}
                >
                    <IoMdInformationCircleOutline className="text-3xl" />
                </motion.button>

                <AnimatePresence>
                    {showModal && (
                        <motion.div
                            initial={{ opacity: 0, borderRadius: "50%" }}
                            animate={{ opacity: 1, borderRadius: "0%" }}
                            exit={{ opacity: 0, borderRadius: "50%" }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 flex items-center z-20 justify-center bg-black bg-opacity-50"
                            onClick={handleModalToggle}
                        >
                            <motion.div
                                initial={{ scale: 0.5 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.5 }}
                                transition={{ duration: 0.5 }}
                                className="modal-container bg-white p-8 rounded-lg shadow-lg w-full"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <p className="text-lg font-semibold mb-4">
                                    Informasi
                                </p>
                                <p>
                                    Sumber utama dari data yang terdapat pada
                                    API Al Quran ini adalah Aplikasi Quran
                                    Kementrian Agama Republik Indonesia,
                                </p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: fadeIn ? 1 : 0 }} // Animate opacity based on fadeIn state
                    transition={{ duration: 0.5 }} // Set duration for the animation
                    style={{ backgroundImage: `url(${bgWhite})` }}
                    className={`flex flex-col  px-10 justify-center bg-cover bg-no-repeat bg-center items-center bg-[url('${bgWhite}')] text-center min-h-screen`}
                >
                    <header className="flex flex-col items-start top-0 pt-3 px-5 pb-3 drop-shadow-md rounded-b-full absolute bg-white">
                        <img src={logoSac} alt="" width={50} />
                    </header>
                    <div className="w-full mx-10">
                        <span className="flex justify-center">
                            <img src={logoQuran} alt="logoQuran" width={90} />
                        </span>
                        <p className="font-bold text-lg mb-5">
                            Al Qur&apos;an Indonesia
                        </p>
                        <span className="flex flex-col gap-2">
                            <Link to={"/alquran/surah"}>
                                <button className="btn btn-info w-full">
                                    Baca Al Qur&apos;an
                                </button>
                            </Link>
                            <Link
                                to={`/alquran/surah/${surahArray}/#ayat-${ayahArray}`}
                            >
                                <button className="btn btn-info w-full">
                                    Terakhir Dibaca
                                </button>
                            </Link>
                        </span>
                        <footer className="mx-5 text-center inset-x-0 mb-5 text-sm fixed bottom-0">
                            <p>
                                Copyright © {year} - All Right Reserved By PT.
                                Surya Amanah Cendekia Ponorogo
                            </p>
                        </footer>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
