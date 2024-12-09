import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import menuItems from '../../data/sidebar.data';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { NBC } from '../../../public/img';

const Sidebar = ({ role, setIsCollapsed }) => {
    const [isCollapsed, setSidebarCollapsed] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
    const location = useLocation();
    const filteredMenuItems = menuItems[role] || [];

    const toggleSidebar = () => {
        setSidebarCollapsed(!isCollapsed);
        setIsCollapsed(!isCollapsed);
    };

    const handleMenuItemClick = (menu) => {
        setActiveItem(menu.name);
    };

    return (
        <div className={`flex min-h-screen flex-col justify-between border-e bg-[#c20250] transition-width duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
            <div className="px-4 py-6">
                <button
                    className={`mb-6 text-white focus:outline-none flex items-center transition-transform duration-300 
                    ${isCollapsed ? 'justify-center w-full' : 'justify-end w-full'}`}
                    onClick={toggleSidebar}
                >
                    {isCollapsed ? <AiOutlineMenu size={24} /> : <AiOutlineClose size={24} />}
                </button>

                <div className='h-auto w-full place-content-center rounded-lg bg-white text-xs text-gray-600'>
                    <img src={NBC} alt="" className={`mx-auto transition-width duration-300 ${isCollapsed ? 'w-11' : 'w-16 '}`} />
                </div>

                <ul className="mt-6 space-y-1">
                    {filteredMenuItems.map((menu, index) => (
                        <li key={index}>
                            {menu.subMenu ? (
                                <details className="group [&_summary::-webkit-details-marker]:hidden ">
                                    <summary
                                        className={`flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 transition-all duration-300 
                                            ${activeItem === menu.name ? 'bg-black text-white' : 'hover:bg-black hover:text-white'}`}
                                        onClick={() => handleMenuItemClick(menu)}
                                    >
                                        <div className="flex items-center text-white">
                                            <div className={`transition-transform duration-300 ${!isCollapsed ? 'scale-125' : 'scale-100'}`}>
                                                {menu.icon}
                                            </div>
                                            <span
                                                className={`ml-2 overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${isCollapsed ? 'max-w-0 opacity-0' : 'max-w-xs opacity-100'}`}
                                                style={{ transitionProperty: 'max-width, opacity' }}
                                            >
                                                {menu.name}
                                            </span>
                                        </div>

                                        {!isCollapsed && (
                                            <span className="shrink-0 transition duration-300 group-open:-rotate-180 text-white">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="size-5"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a 1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </span>
                                        )}
                                    </summary>

                                    <ul className={`transition-[max-height] duration-300 ease-in-out overflow-hidden ${isCollapsed ? 'max-h-0 opacity-0' : 'max-h-screen opacity-100'} mt-2 space-y-1 px-4`}>
                                        {menu.subMenu.map((sub, subIndex) => (
                                            <li key={subIndex}>
                                                <Link
                                                    to={sub.path}
                                                    onClick={() => handleMenuItemClick(sub)}
                                                    className={`flex items-center rounded-lg px-4 py-2 text-md font-medium transition-all duration-300 
                                                        ${activeItem === sub.name ? 'bg-black text-white' : 'text-white hover:bg-black hover:text-white'}`}
                                                >
                                                    <div className={`transition-transform duration-300 ${!isCollapsed ? 'scale-125' : 'scale-100'}`}>
                                                        {sub.icon}
                                                    </div>
                                                    <span
                                                        className={`ml-2 overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${isCollapsed ? 'max-w-0 opacity-0' : 'max-w-xs opacity-100'}`}
                                                        style={{ transitionProperty: 'max-width, opacity' }}
                                                    >
                                                        {sub.name}
                                                    </span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </details>
                            ) : (
                                <Link
                                    to={menu.path}
                                    onClick={() => handleMenuItemClick(menu)}
                                    className={`flex items-center rounded-lg px-4 py-2 text-md font-medium transition-all duration-300 
                                        ${activeItem === menu.name ? 'bg-black text-white' : 'text-white hover:bg-black hover:text-white'}`}
                                >
                                    <div className={`transition-transform duration-300 ${!isCollapsed ? 'scale-125' : 'scale-100'}`}>
                                        {menu.icon}
                                    </div>
                                    <span
                                        className={`ml-2 overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${isCollapsed ? 'max-w-0 opacity-0' : 'max-w-xs opacity-100'}`}
                                        style={{ transitionProperty: 'max-width, opacity' }}
                                    >
                                        {menu.name}
                                    </span>
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
