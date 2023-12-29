import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import UnderNavbar from "../components/underNavbar";
import IndexQuran from "../pages/alquran/indexSurah";
import axios from "../utils/axios";
import { useLocation, useParams } from "react-router-dom";
import HalamanSurah from "../pages/alquran/halamanSurah";
import IndexJuz from "../pages/alquran/indexJuz";

export default function MainLayout() {
    const [datas, setDatas] = useState(null);
    const [noSurah, setNoSurah] = useState(null);
    const [tes, setTes] = useState(null);

    const location = useLocation();

    const { id } = useParams();
    // console.log(id);
    useEffect(() => {
        setNoSurah(id);
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get("surat").then((response) => {
                    setDatas(response); // Set the response data, not the whole response object
                });
                await axios.get("surat/1").then((res) => {
                    setTes(res);
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
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

    // Usage:
    const surahArray = getSurahArrayFromLocalStorage();
    const ayahArray = getAyahArrayFromLocalStorage();
    // console.log(datas);
    return (
        <>
            <div>
                <Navbar datas={datas ? datas : null} noSurat={noSurah} />
                {!noSurah ? (
                    <IndexQuran datas={datas ? datas : null} />
                ) : (
                    <HalamanSurah noSurat={noSurah} noAyah={ayahArray} />
                )}
            </div>
        </>
    );
}
