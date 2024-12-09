import React, { useState } from "react";
import { Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import { MdLogout, MdAccountCircle } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import useLogoutForm from "../../hooks/logout/useLogoutForm";

const AdminNavbar = ({ role, name }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const { handleLogout } = useLogoutForm();

  const getLastBreadcrumb = () => {
    const pathnames = location.pathname.split('/').filter(x => x);
    return pathnames.length > 0 ? pathnames[pathnames.length - 1] : '';
  };

  const lastBreadcrumb = getLastBreadcrumb();

  return (
    <nav className="bg-white text-[#1e1e1e] shadow-sm py-4 px-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="capitalize text-md font-semibold">{role} / {name}</span>
          {lastBreadcrumb && (
            <nav className="text-md text-gray-500 ml-2">
              <span className="text-[#1e1e1e]">{` / ${lastBreadcrumb.charAt(0).toUpperCase() + lastBreadcrumb.slice(1)}`}</span>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Menu open={profileOpen} handler={setProfileOpen}>
            <MenuHandler>
              <button className="flex items-center space-x-2 rounded-md p-2">
                <MdAccountCircle className="text-2xl" />
                <span className="hidden md:block">Profile</span>
              </button>
            </MenuHandler>
            <MenuList>
              <MenuItem onClick={handleLogout}>
                <div className="flex items-center gap-2 text-red-600">
                  <MdLogout className="text-lg" />
                  <span>Logout</span>
                </div>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
