import { useEffect, useRef, useState } from "react";
import axios from "../../utils/axios";
import UnderModal from "../../components/underModal";
import { useLocation, useParams } from "react-router-dom";

export default function HalamanSurah({ noSurat, noAyah }) {
    const [datas, setDatas] = useState(null);
    const [noSurah, setNoSurah] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDat, setSelectedDat] = useState(null);
    const [selectedNo, setSelectedNo] = useState(null);
    const contentRef = useRef(null);
    const location = useLocation();

    const { id } = useParams();
    // console.log(noSurat);

    const openModal = (dat) => {
        setSelectedDat(datas);
        setSelectedNo(dat);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        setNoSurah(id);
    }, [id]);

    useEffect(() => {
        if (noSurah) {
            const fetchData = async () => {
                try {
                    await axios
                        .get(`surat/${noSurah}`)
                        .then((response) => {
                            setDatas(response);
                        })
                        .catch();
                } catch (error) {
                    // console.error("Error fetching data:", error);
                }
            };

            fetchData();
        }
        if (
            contentRef.current &&
            noAyah &&
            location.hash == `#ayat-${noAyah}`
        ) {
            const ayahElement = document.getElementById(`ayat-${noAyah}`);
            if (ayahElement) {
                const headerHeight =
                    0.3 *
                    parseFloat(
                        getComputedStyle(document.documentElement).fontSize
                    ); // Convert 3.3rem to pixels
                const topOffset =
                    ayahElement.offsetTop -
                    (window.innerHeight - ayahElement.clientHeight) / 2 -
                    headerHeight;
                window.scroll({
                    top: topOffset,
                    behavior: "smooth",
                });
                // console.log(ayahElement.offsetTop - headerHeight);
            }
        }
    }, [noSurah, noAyah, location]);

    // function removeNumbering(inputString) {
    //     return inputString.replace(/\d+\)/g, "");
    // }

    // console.log(datas?.data.data);
    return (
        <>
            {datas && noSurah ? (
                <>
                    <div className="w-full">
                        <span className="flex justify-between mb-5 m-4 bg-slate-300 rounded-lg p-4 font-semibold text-slate-700 drop-shadow-md">
                            <p className="bg-slate-50 rounded-md p-1 drop-shadow-md flex items-center">
                                <span className="">
                                    {datas.data.data.tempatTurun}
                                </span>
                            </p>
                            <p className="bg-slate-50 max-w-[9rem] rounded-md p-1 text-center drop-shadow-md flex items-center">
                                {datas.data.data.arti}
                            </p>
                            <p className="bg-slate-50 rounded-md p-1 drop-shadow-md flex flex-col justify-center items-center">
                                <span>{datas.data.data.jumlahAyat}</span>
                                <span>Ayat</span>
                            </p>
                        </span>

                        <span className="overflow-y-auto relative ">
                            <div
                                style={{
                                    fontFamily: "Tes2",
                                    direction: "rtl",
                                    fontSize: "28px",
                                    lineHeight: "57px",
                                    WebkitFontSmoothing: "antialiased",
                                }}
                                className="flex justify-center mb-5"
                            >
                                <p className="bg-slate-50/50 shadow-sm px-4 py-2 rounded-xl">
                                    بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيْمِ
                                </p>
                            </div>
                            {datas.data.data.ayat.map((dat, i) => (
                                <div
                                    key={i}
                                    id={`ayat-${dat.nomorAyat}`}
                                    ref={contentRef}
                                    className={`gap-2 mx-2 rounded-md px-2 py-1 flex  top-[3.3rem] ${
                                        i % 2 == 0 ? "bg-slate-50/50 py-1" : ""
                                    }`}
                                >
                                    <div className="">
                                        <svg
                                            className="sticky top-[3.3rem]"
                                            width="34"
                                            height="40"
                                            viewBox="0 0 34 40"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <text
                                                x="50%"
                                                y="50%"
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                                fontFamily="Arial"
                                                fontSize="14"
                                                fill="black"
                                            >
                                                {dat.nomorAyat}
                                            </text>
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M17 0L19.9723 1.71979C25.3987 2.59915 30.0334 5.84672 32.7866 10.3704H31.026C32.9021 13.1098 34 16.4264 34 20C34 23.5736 32.9021 26.8902 31.026 29.6296H32.7866C30.0334 34.1533 25.3987 37.4009 19.9723 38.2802L17 40L14.0277 38.2802C8.60133 37.4009 3.96661 34.1533 1.21336 29.6296H2.97404C1.09787 26.8902 0 23.5736 0 20C0 16.4264 1.09787 13.1098 2.97404 10.3704H1.21336C3.96661 5.84672 8.60133 2.59915 14.0277 1.71979L17 0ZM4.80913 29.6296H6.75824C8.83443 31.8465 11.6191 33.3891 14.7501 33.8944L17 32.5926L19.2499 33.8944C22.3809 33.3891 25.1656 31.8465 27.2417 29.6296H29.1909C31.2768 26.981 32.5217 23.6362 32.5217 20C32.5217 16.3638 31.2768 13.019 29.1909 10.3704H27.2417C25.1656 8.15348 22.3809 6.61088 19.2499 6.1056L17 7.40741L14.7501 6.1056C11.6191 6.61088 8.83443 8.15348 6.75824 10.3704H4.80913C2.72316 13.019 1.47826 16.3638 1.47826 20C1.47826 23.6362 2.72316 26.981 4.80913 29.6296ZM18.9203 2.59259L17 1.48148L15.0797 2.59259V4.81481L17 5.92593L18.9203 4.81481V2.59259ZM13.2832 4.26884C13.3801 4.6663 13.1371 5.06714 12.7406 5.16421C10.0231 5.82935 7.599 7.24808 5.70183 9.18837C5.41612 9.48057 4.94816 9.48532 4.6566 9.19899C4.36504 8.91267 4.36029 8.44369 4.646 8.15149C6.73112 6.01897 9.39759 4.45747 12.3898 3.72504C12.7864 3.62797 13.1864 3.87144 13.2832 4.26884ZM21.2596 5.16421C20.863 5.06714 20.6201 4.6663 20.7169 4.26884C20.8138 3.87144 21.2138 3.62797 21.6103 3.72504C24.6026 4.45747 27.2691 6.01897 29.3542 8.15149C29.6399 8.44369 29.6351 8.91267 29.3436 9.19899C29.052 9.48532 28.5841 9.48057 28.2984 9.18837C26.4012 7.24808 23.9771 5.82935 21.2596 5.16421ZM17 38.5185L18.9203 37.4074V35.1852L17 34.0741L15.0797 35.1852V37.4074L17 38.5185ZM12.7406 34.8358C13.1371 34.9329 13.3801 35.3337 13.2832 35.7312C13.1864 36.1286 12.7864 36.372 12.3898 36.275C9.39759 35.5425 6.73112 33.981 4.646 31.8485C4.36029 31.5563 4.36504 31.0873 4.6566 30.801C4.94816 30.5147 5.41612 30.5194 5.70183 30.8116C7.599 32.7519 10.0231 34.1706 12.7406 34.8358ZM20.7169 35.7312C20.6201 35.3337 20.863 34.9329 21.2596 34.8358C23.9771 34.1706 26.4012 32.7519 28.2984 30.8116C28.5841 30.5194 29.052 30.5147 29.3436 30.801C29.6351 31.0873 29.6399 31.5563 29.3542 31.8485C27.2691 33.981 24.6026 35.5425 21.6103 36.275C21.2138 36.372 20.8138 36.1286 20.7169 35.7312Z"
                                                fill="#846D35"
                                            />
                                        </svg>
                                    </div>
                                    <button
                                        className="w-full text-start sticky top-[3.3rem]"
                                        onClick={() => openModal(dat)}
                                    >
                                        <span className="flex flex-col justify-end my-5">
                                            <span className="flex justify-end">
                                                <p
                                                    style={{
                                                        fontFamily: "Tes2",
                                                        direction: "rtl",
                                                        fontSize: "28px",
                                                        lineHeight: "57px",
                                                        WebkitFontSmoothing:
                                                            "antialiased",
                                                    }}
                                                    className="text-3xl  mb-4 text-stone-900/90 leading-loose"
                                                >
                                                    {dat.teksArab}
                                                </p>
                                            </span>
                                            <p className="text-emerald-700 mb-3">
                                                {dat.teksLatin}
                                            </p>
                                            <p className="">
                                                {dat.teksIndonesia}
                                            </p>
                                        </span>
                                    </button>
                                </div>
                            ))}
                            {selectedDat && (
                                <span className="z-50 sticky">
                                    <UnderModal
                                        isOpen={isModalOpen}
                                        onClose={closeModal}
                                        data={selectedDat}
                                        noAyat={selectedNo}
                                    />
                                </span>
                            )}
                        </span>
                    </div>
                </>
            ) : (
                <span className="flex justify-center items-center mt-[50%]">
                    <span className="loading loading-dots loading-md"></span>
                </span>
            )}
        </>
    );
}
