import { useEffect, useState } from "react";
import axios from "../utils/axios";
import MainLayout from "../layout/mainLayout";

export default function IndexQuran() {
    const [datas, setDatas] = useState();

    const res = async () => {
        await axios.get("surah").then((response) => {
            setDatas(response);
        });
    };

    // params Int id
    // surah/id
    //

    useEffect(() => {
        res();
    }, []);
    // console.log(datas);
    return (
        <MainLayout>
            <div className="m-5">
                {!datas ? (
                    <span className="flex justify-center items-center mt-[50%]">
                        <span className="loading loading-dots loading-md"></span>
                    </span>
                ) : (
                    datas.data.map((data, i) => (
                        <div key={i}>
                            <div className="flex justify-between items-center">
                                <span className="flex items-center gap-2">
                                    <p>{data.nomor}</p>
                                    <span>
                                        <p className="font-bold">
                                            {data.nama_latin}
                                        </p>
                                        <p className="uppercase">
                                            {data.tempat_turun} |{" "}
                                            {data.jumlah_ayat} AYAT
                                        </p>
                                    </span>
                                </span>
                                <span>
                                    <p>{data.nama}</p>
                                </span>
                            </div>
                            <div className="divider m-0"></div>
                        </div>
                    ))
                )}
            </div>
        </MainLayout>
    );
}
