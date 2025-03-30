import React, { useState } from 'react';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className='bg-[#c5ef51] p-4 shadow-md'>
            <div className='flex justify-between items-center w-full max-w-6xl mx-auto'>
                <div className="logo font-extrabold text-lg sm:text-xl">MyTasks</div>
                
                {/* Mobile Menu Button */}
                <div className="sm:hidden cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </div>
                
                {/* Navigation Links */}
                <div className={`absolute sm:static top-16 left-0 w-full sm:w-auto bg-[#c5ef51] sm:bg-transparent p-4 sm:p-0 transition-all duration-300 ease-in-out ${menuOpen ? 'block' : 'hidden'} sm:flex`}>
                    <ul className='flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm sm:text-base font-medium'>
                        <li className='cursor-pointer hover:font-bold'>Your Task</li>
                        <li className='cursor-pointer hover:font-bold'>Achievement</li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;