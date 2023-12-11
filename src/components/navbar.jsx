import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ noSurat, datas }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [surah, setSurah] = useState();

    useEffect(() => {
        let prevScrollPos = 0;
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            const isCurrentlyScrolled = currentScrollPos > 0;

            // Only update state if there's a change in scroll position
            if (isCurrentlyScrolled !== isScrolled) {
                setIsScrolled(isCurrentlyScrolled);
            }

            prevScrollPos = currentScrollPos;
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isScrolled]);
    // console.log(isScrolled);

    const getLinkTo = () => {
        return !datas ? "/" : "/alquran"; // Replace "/some-other-path" with your desired path
    };

    // console.log(datas);

    return (
        <>
            <div className={`bg-blue-600  mx-auto overflow-y-auto`}>
                <span
                    className={`transition-opacity ease-in-out duration-500 sticky top-0 ${
                        !isScrolled
                            ? "opacity-100 "
                            : "opacity-0 overflow-hidden"
                    }`}
                >
                    <Link
                        to={getLinkTo()}
                        className="flex flex-row items-center pt-5 pl-5 gap-2"
                    >
                        <span className="text-white font-semibold text-lg">
                            &laquo;
                        </span>
                        <h1 className="text-white font-semibold z-10">
                            Al-Qur&apos;an Indonesia
                        </h1>
                    </Link>
                </span>
            </div>
            <span className=" sticky top-0 z-10">
                <div className="bg-blue-600 rounded-b-xl drop-shadow-md">
                    <span className="flex justify-around  pt-3 gap-2 mx-5  font-semibold text-slate-300">
                        {!noSurat ? (
                            <>
                                <span className="flex flex-col w-full">
                                    <button className="w-full">SURAH</button>
                                    {location.pathname == "/alquran" && (
                                        <>
                                            <hr className=" mt-6 flex flex-row items-center self-stretch mb-0 h-1 bg-white border-none whitespace-nowrap" />
                                        </>
                                    )}
                                </span>
                                <span className="flex flex-col w-full">
                                    <button className="w-full">JUZ</button>
                                    {location.pathname == "/" && (
                                        <>
                                            <hr className=" mt-6 flex flex-row items-center self-stretch mb-0 h-1 bg-white border-none whitespace-nowrap" />
                                        </>
                                    )}
                                </span>
                            </>
                        ) : (
                            <span className="flex flex-col w-full my-2">
                                <button className="w-full">
                                    {datas?.data.data[noSurat - 1].latin}
                                </button>
                            </span>
                        )}
                    </span>
                </div>
            </span>
        </>
    );
}
