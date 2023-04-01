import { useState } from "react"
import { Link, NavLink } from "react-router-dom"

export default function Header() {

    const [isOpen, setIsOpen] = useState(false)

    const closeMenu = () => {
        setIsOpen(false)
    }

    return (
        <div className="px-4 md:px-10 overflow-x-clip py-4 bg-gray-900 text-white bg-opacity-95 backdrop-blur-sm border-b border-slate-700/60 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between">
                    <Link to='/'><h2 className="uppercase text-lg">CrickBuzz<span className="text-xs text-green-400">Live</span></h2></Link>

                    <div 
                        className={`${isOpen && 'fixed w-full h-[calc(100vh-3.5rem)] top-[60.8px] bg-gray-900 -z-10 bg-opacity-95 left-0 backdrop-blur-md'} md:hidden`}
                        onClick = {() => setIsOpen(false)}
                    >

                    </div>

                    <nav className={`md:flex transition-all max-md:fixed max-md:w-[60vw] max-md:bg-gray-800 max-md:top-[60.8px] max-md:min-h-[calc(100vh-3.5rem)] ${!isOpen && 'max-md:invisible max-md:-right-full'} ${isOpen && 'right-0'}`}>
                        <ul className="flex gap-6 md:gap-12 uppercase max-md:flex-col max-md:px-4 max-md:py-8">
                            <li><NavLink to='/' onClick={closeMenu}>Live</NavLink></li>
                            <li><NavLink to='/recent' onClick={closeMenu}>Recent</NavLink></li>
                            <li><NavLink to='/upcoming' onClick={closeMenu}>Upcoming</NavLink></li>
                        </ul>
                    </nav>

                    <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                        {!isOpen &&
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                            </svg>}
                        {isOpen &&
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}