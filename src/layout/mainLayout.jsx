import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import UnderNavbar from "../components/underNavbar";
import IndexQuran from "../pages/alquran/indexSurah";
import axios from "../utils/axios";
import { useLocation, useParams } from "react-router-dom";
import HalamanSurah from "../pages/alquran/halamanSurah";

export default function MainLayout() {
    const [datas, setDatas] = useState(null);
    const [noSurah, setNoSurah] = useState(null);

    const { id } = useParams();
    useEffect(() => {
        setNoSurah(id);
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get("quran-surah").then((response) => {
                    setDatas(response); // Set the response data, not the whole response object
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    // console.log(id);
    return (
        <>
            <div>
                <Navbar datas={datas ? datas : null} noSurat={noSurah} />
                <div>
                    {!noSurah ? (
                        <IndexQuran datas={datas ? datas : null} />
                    ) : (
                        <HalamanSurah noSurat={noSurah} />
                    )}
                </div>
            </div>
        </>
    );
}
