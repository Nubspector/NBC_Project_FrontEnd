import {
  AiOutlineUser,
  AiOutlineSchedule,
  AiOutlineShop,
  AiOutlineScissor,
  AiOutlineHome,
  AiOutlineGift,
  AiOutlineCalendar,
} from "react-icons/ai";
import { BsFolder2Open } from 'react-icons/bs';
import { FaList } from "react-icons/fa";

const menuItems = {
  Admin: [
    { name: "Employee", path: "admin/employee", icon: <AiOutlineUser /> },
    { name: "Treatment", path: "admin/treatment", icon: <AiOutlineScissor /> },
    { name: "Product", path: "admin/product", icon: <AiOutlineShop /> },
    { name: "Room", path: "admin/room", icon: <AiOutlineHome /> },
  ],
  Beautician: [
    {
      name: "Appointments",
      path: "/beautician/appointments",
      icon: <AiOutlineSchedule size={10} />,
    },
    {
      name: "Services",
      path: "/beautician/services",
      icon: <AiOutlineScissor />,
    },
    {
      name: "Account",
      icon: <AiOutlineUser />,
      subMenu: [
        {
          name: "Profile",
          path: "/beautician/profile",
          icon: <AiOutlineUser />,
        },
        {
          name: "Settings",
          path: "/beautician/settings",
          icon: <AiOutlineCalendar />,
        },
      ],
    },
  ],
  "Head Clinic": [
    {
      name: "Schedule",
      path: "head-clinic/schedule",
      icon: <AiOutlineSchedule />,
    },
    { name: "Promo", path: "head-clinic/promo", icon: <AiOutlineGift /> },
    { name: "Laporan Customer ", path: "head-clinic/report/customer_baru", icon: <BsFolder2Open /> },
    { name: "Laporan Pendapatan ", path: "head-clinic/report/pendapatan", icon: <BsFolder2Open /> },
    { name: "Laporan Produuk ", path: "head-clinic/report/produk", icon: <BsFolder2Open /> },
    { name: "Laporan Treatment", path: "head-clinic/report/treatment", icon: <BsFolder2Open /> },
    { name: "Laporan Doktor ", path: "head-clinic/report/doctor", icon: <BsFolder2Open /> },
  ],
  Cashier: [
    {
      name: "List Antrian",
      path: "cashier/transaksi",
      icon: <FaList />,
    },
    {
      name: "Riwayat Transaksi",
      path: "cashier/riwayat-transaksi",
      icon: <AiOutlineScissor />,
    },
  ],
  "Customer Service": [
    {
      name: "Customer",
      path: "customer-service/customer",
      icon: <AiOutlineSchedule size={10} />,
    },

  ],
  Doctor: [
    {
      name: "List of Patients",
      path: "doctor/list-of-patients",
      icon: <AiOutlineSchedule size={10} />,
    },
  ],
};

export default menuItems;
