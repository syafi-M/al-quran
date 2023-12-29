import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../utils/axios";

export default function UnderModal({ isOpen, onClose, data, noAyat }) {
    const [nSurah, setNSurah] = useState(null);
    const [nAyah, setNAyah] = useState(null);
    const [opened, setOpened] = useState(false);
    const [datas, setDatas] = useState();

    const parsedAyah = JSON.parse(localStorage.getItem("noAyah")) || null;
    const parsedSurah = JSON.parse(localStorage.getItem("noSurah")) || null;

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get(`surat/${parsedSurah}`).then((response) => {
                    setDatas(response); // Set the response data, not the whole response object
                });
            } catch (error) {
                // console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [nSurah, parsedSurah]);
    // console.log(datas, data);

    useEffect(() => {
        if (data) {
            setNSurah(data?.data.data.nomor);
            setNAyah(noAyat?.nomorAyat);
        }
    }, [data, noAyat]);
    // console.log(noSurah);
    const handleModal = () => {
        setOpened(true);
    };
    const closeModal = () => {
        setOpened(false);
        onClose();
    };

    const handleBookmark = () => {
        let noSurah = new Set(
            JSON.parse(localStorage.getItem("noSurah")) || []
        );
        let noAyah = new Set(JSON.parse(localStorage.getItem("noAyah")) || []);

        if (nSurah !== null && nAyah !== null) {
            // Menghapus pasangan surah dan ayah yang sudah ada, jika ada
            noSurah.delete(nSurah);
            noAyah.delete(nAyah);

            // Menambahkan pasangan surah dan ayah yang baru
            noSurah.add(nSurah);
            noAyah.add(nAyah);

            // Memastikan setidaknya ada satu item dalam set dan menghapus yang pertama jika lebih dari satu
            if (noSurah.size > 1) {
                noSurah.delete(Array.from(noSurah)[0]);
            }
            if (noAyah.size > 1) {
                noAyah.delete(Array.from(noAyah)[0]);
            }

            // Menyimpan kembali nilai di localStorage
            localStorage.setItem(
                "noSurah",
                JSON.stringify(Array.from(noSurah))
            );
            localStorage.setItem("noAyah", JSON.stringify(Array.from(noAyah)));
        }

        onClose();
        setOpened(false);
    };

    useEffect(() => {
        let noSurah = new Set(
            JSON.parse(localStorage.getItem("noSurah")) || []
        );
        let noAyah = new Set(JSON.parse(localStorage.getItem("noAyah")) || []);
        console.log(nSurah, nAyah);
    }, [nAyah, nSurah]);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (e.target.classList.contains("modal-overlay")) {
                onClose();
                setOpened(false);
            }
        };

        if (isOpen) {
            document.body.style.overflowY = "hidden";
            document.addEventListener("mousedown", handleOutsideClick);
        } else {
            document.body.style.overflowY = "auto";
            document.removeEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            document.body.style.overflowY = "auto";
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isOpen, onClose]);

    // console.log(parsedSurah, datas?.data.data);

    return (
        <AnimatePresence mode="wait">
            <span className=" relative">
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="modal-overlay z-[999999999] fixed inset-0 flex items-center justify-center bg-slate-500 bg-opacity-50 backdrop-blur-sm"
                    >
                        {opened ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="modal-container absolute flex items-center justify-center inset-x-[10%] h-fit bg-white p-6 rounded-3xl shadow-md"
                            >
                                <span className="gap-2">
                                    <p className="font-bold text-lg">
                                        Tandai Terakhir Dibaca
                                    </p>
                                    <p className="text-md">
                                        {parsedSurah && parsedAyah
                                            ? `Ingin Mengganti QS. ${datas?.data.data.namaLatin}: Ayat ${parsedAyah} ke QS. ${data.data.data.namaLatin}: Ayat ${noAyat.nomorAyat}?`
                                            : `Ingin Memasukkan QS.${data.data.data.namaLatin}: Ayat ${noAyat.nomorAyat}`}
                                    </p>
                                    <span className="flex justify-end gap-10 mt-5 font-semibold text-emerald-600">
                                        <button onClick={closeModal}>
                                            Batal
                                        </button>
                                        <button
                                            onClick={() => {
                                                handleBookmark(data);
                                            }}
                                        >
                                            Oke
                                        </button>
                                    </span>
                                </span>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ translateY: "100%" }}
                                animate={{ translateY: 0 }}
                                exit={{ translateY: "100%" }}
                                transition={{ duration: 0.3 }}
                                className="modal-container text-lg absolute bottom-0 w-full h-auto bg-white p-6 rounded-t-3xl shadow-md"
                            >
                                <span className="flex flex-col  gap-2">
                                    <p className="text-center font-bold my-3">
                                        {data.data.data.namaLatin}: Ayat{" "}
                                        {noAyat.nomorAyat}
                                    </p>
                                    <span className="flex flex-col text-medium justify-start items-start gap-2 text-start">
                                        <button onClick={handleModal}>
                                            Tandai sebagai terakhir dibaca
                                        </button>
                                    </span>
                                </span>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </span>
        </AnimatePresence>
    );
}
