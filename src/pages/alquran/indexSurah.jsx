import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import MainLayout from "../../layout/mainLayout";
import HalamanSurah from "./halamanSurah";
import { Link } from "react-router-dom";

export default function IndexQuran({ datas }) {
    // console.log(datas);
    return (
        <div className="">
            {datas ? (
                datas.data.data.map((data, i) => (
                    <div key={i}>
                        <Link
                            to={`surah/${data.id}`}
                            className="w-full text-start"
                        >
                            <div className="flex justify-between items-center">
                                <span className="flex items-center gap-2">
                                    <p>{data.id}</p>
                                    <span>
                                        <p className="font-bold">
                                            {data.transliteration}
                                        </p>
                                        <p className="uppercase">
                                            {data.location} | {data.num_ayah}{" "}
                                            AYAT
                                        </p>
                                    </span>
                                </span>
                                <span>
                                    <p style={{ fontFamily: "IndoPack" }}>
                                        {data.arabic}
                                    </p>
                                </span>
                            </div>
                            <div className="divider m-0"></div>
                        </Link>
                    </div>
                ))
            ) : (
                <span className="flex justify-center items-center mt-[50%]">
                    <span className="loading loading-dots loading-md"></span>
                </span>
            )}
        </div>
    );
}
