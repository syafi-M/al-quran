import { Link } from "react-router-dom";

export default function Dashboard() {
    return (
        <>
            <div className="flex justify-center items-center text-center min-h-screen">
                <div className="w-full mx-10">
                    <p>Aku Dashboard</p>
                    <Link to={"/alquran"}>
                        <button className="btn btn-info w-full">
                            Baca Al Qur&apos;an
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}
