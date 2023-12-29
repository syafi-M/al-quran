import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ noSurat, datas }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [surah, setSurah] = useState();

    const location = useLocation();

    useEffect(() => {
        if (datas) {
            // console.log(datas);
        }
    }, [datas]);

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
    const nSurat = parseInt(noSurat, 10);

    // console.log(datas?.data.data);

    return (
        <>
            <nav className="flex flex-col relative">
                <div className={`bg-blue-600 w-full mx-auto `}>
                    <span
                        className={`transition-opacity ease-in-out duration-500 sticky top-0 ${
                            !isScrolled
                                ? "opacity-100 "
                                : "opacity-0 overflow-hidden"
                        }`}
                    >
                        <Link
                            to={noSurat ? "/alquran/surah" : "/"}
                            className="flex flex-row items-center pt-5 pl-5 gap-2"
                        >
                            <span className="text-white font-semibold text-xl">
                                &laquo;
                            </span>
                            <h1 className="text-white font-semibold z-10">
                                Al-Qur&apos;an Indonesia
                            </h1>
                        </Link>
                    </span>
                </div>
            </nav>
            {/** span2 **/}
            <span className="sticky top-0 z-10">
                <div className="bg-blue-600 rounded-b-xl drop-shadow-md">
                    <span className="flex justify-around  pt-3 gap-2 mx-5  font-semibold text-slate-300">
                        {!noSurat ? (
                            <>
                                <Link
                                    to={"/alquran/surah"}
                                    className="flex flex-col w-full"
                                >
                                    <button className="w-full">SURAH</button>
                                    {location.pathname == "/alquran/surah" && (
                                        <>
                                            <hr className=" mt-6 flex flex-row items-center self-stretch mb-0 h-1 bg-white border-none whitespace-nowrap" />
                                        </>
                                    )}
                                </Link>
                            </>
                        ) : (
                            <span className="w-full">
                                <span className="flex justify-between text-center my-2 text-sm">
                                    <Link
                                        to={
                                            datas?.data.data[nSurat + 1]
                                                ? `/alquran/surah/${nSurat + 1}`
                                                : ""
                                        }
                                        onClick={() => window.scrollTo(0, 0)}
                                        className="w-full"
                                    >
                                        {datas?.data.data[nSurat + 1]
                                            ? datas?.data.data[nSurat].namaLatin
                                            : ""}
                                    </Link>
                                    <Link
                                        to={`/alquran/surah/${nSurat}`}
                                        onClick={() => window.scrollTo(0, 0)}
                                        className="w-full"
                                    >
                                        {datas?.data.data[nSurat - 1]
                                            ? datas?.data.data[nSurat - 1]
                                                  .namaLatin
                                            : "Link to Previous Surah"}
                                    </Link>
                                    <Link
                                        to={
                                            datas?.data.data[nSurat - 2]
                                                ? `/alquran/surah/${nSurat - 1}`
                                                : ""
                                        }
                                        onClick={() => window.scrollTo(0, 0)}
                                        className="w-full"
                                    >
                                        {datas?.data.data[nSurat - 2]
                                            ? datas?.data.data[nSurat - 2]
                                                  .namaLatin
                                            : ""}
                                    </Link>
                                </span>
                            </span>
                        )}
                    </span>
                </div>
            </span>
        </>
    );
}
