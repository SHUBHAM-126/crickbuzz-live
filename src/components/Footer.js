import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="px-4 md:px-10 py-4 bg-gray-900 border-t border-slate-700/70 text-center">
        <div>
            <p><Link to='/'><span className="uppercase">Crickbuzz</span><span className="text-green-400 text-xs">Live</span></Link> <span className="text-slate-500">•</span> <span className="text-xs">Developed by Shubham</span></p>
        </div>
    </div>
  )
}