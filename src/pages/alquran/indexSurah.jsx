import { debounce, throttle } from "lodash";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function IndexQuran({ datas }) {
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    // Use a useEffect to update the filtered data when search term changes
    useEffect(() => {
        if (datas) {
            const sanitizedSearch = search
                .replace(/[^a-zA-Z0-9]/g, "")
                .toLowerCase();

            const filtered = datas?.data.data.filter((data) => {
                // Remove non-alphanumeric characters and spaces from the data for comparison
                const sanitizedNamaLatin = data.namaLatin
                    .replace(/[^a-zA-Z0-9]/g, "")
                    .toLowerCase();
                const sanitizedTempatTurun = String(data.tempatTurun)
                    .replace(/[^a-zA-Z0-9]/g, "")
                    .toLowerCase();
                const sanitizedNomor = String(data.nomor)
                    .replace(/[^a-zA-Z0-9]/g, "")
                    .toLowerCase();

                return (
                    sanitizedNamaLatin.includes(sanitizedSearch) ||
                    sanitizedTempatTurun.includes(sanitizedSearch) ||
                    sanitizedNomor.includes(sanitizedSearch)
                );
            });

            setFilteredData(filtered);
        }
    }, [datas, search]);

    // Define the throttled search function
    const handleSearch = throttle((searchValue) => {
        setSearch(searchValue);
    }, 500);
    // console.log(filteredData);
    return (
        <div className="p-4">
            <input
                type="text"
                placeholder="Cari surah (contoh: 'An-Nas', 'Al-ikhlas')"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-4 py-2 text-gray-900 rounded-md mb-4"
            />
            {filteredData.length > 0 ? (
                filteredData.map((data, i) => (
                    <div key={i}>
                        <Link
                            to={`${data.nomor}`}
                            className="w-full text-start"
                        >
                            <div className="flex justify-between items-center">
                                <span className="flex items-center gap-2">
                                    <p className="mr-5">{data.nomor}.</p>
                                    <span>
                                        <p className="font-bold">
                                            {data.namaLatin}
                                        </p>
                                        <p className="uppercase">
                                            {data.tempatTurun} |{" "}
                                            {data.jumlahAyat} AYAT
                                        </p>
                                    </span>
                                </span>
                                <span>
                                    <p style={{ fontFamily: "IndoPack" }}>
                                        {data.nama}
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
