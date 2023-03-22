import { Link } from "react-router-dom";

export default function PageNotFound() {
    return (
        <div className="py-5 md:py-10">
            <h1 className="text-3xl mb-3">Page Not Found!</h1>
            <p className="pb-10">Sorry the page you are looking for is not available or does not exists.</p>
            <Link to='/' className="bg-slate-600 px-4 py-2 rounded-sm inline-flex gap-1 hover:bg-slate-700">
                See Live Matches
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inline align-middle w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
            </Link>
        </div>
    )
}