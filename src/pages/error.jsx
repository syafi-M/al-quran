import { Link } from "react-router-dom";
import "../index.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ErrorPage() {
    return (
        <div className="body p-[50%]">
            <div className="div">
                <p id="error">
                    Halaman<span> Tidak </span>Ditemukan
                </p>
                <p id="code">
                    4<span>0</span>
                    <span>4</span>
                </p>
                <Link to={"/"} className="dashboard-button">
                    {" "}
                    KEMBALI
                </Link>
            </div>
        </div>
    );
}
