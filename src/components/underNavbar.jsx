import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function UnderNavbar({ noSurat }) {
    const location = useLocation();

    const [datas, setDatas] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios
                    .get(
                        `https://web-api.qurankemenag.net/quran-ayah?surah=${noSurat}`
                    )
                    .then((response) => {
                        setDatas(response); // Set the response data, not the whole response object
                    });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [noSurat]);
    console.log(datas);
    return (
        <span className=" sticky top-0 z-10">
            <div className="bg-blue-600 rounded-b-xl drop-shadow-md">
                <span className="flex justify-around  pt-3 gap-2 mx-5  font-semibold text-slate-300">
                    {!datas ? (
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
                        <span className="flex flex-col w-full">
                            <button className="w-full">
                                {datas.data.data[0].surah.latin}
                            </button>
                            {location.pathname == "/alquran" && (
                                <>
                                    <hr className=" mt-6 flex flex-row items-center self-stretch mb-0 h-1 bg-white border-none whitespace-nowrap" />
                                </>
                            )}
                        </span>
                    )}
                </span>
            </div>
        </span>
    );
}
