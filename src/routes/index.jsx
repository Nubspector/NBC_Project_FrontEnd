import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginUser from "../pages/login";
import DashboardAdmin from "../pages/admin/dashboard";
import ProductPage from "../pages/admin/product";
import EmployeePage from "../pages/admin/employee";
import TreatmentPage from "../pages/admin/treatment";
import RoomPage from "../pages/admin/room";
import SchedulePage from "../pages/admin/schedule";
import PromoPage from "../pages/admin/promo";
import CustomerPage from "../pages/admin/customer";
import ProtectedRoutes from "./ProtectedRoutes";
import TransactionPage from "../pages/admin/transaction";
import ListPasienPage from "../pages/admin/doctor/list-pasien";
import CahsierPage from "../pages/admin/cashier";
import RiwayatTransaksiPage from "../pages/admin/cashier/riwayatTransaksi";
import CustomerReportPage from "../pages/admin/report/customer_baru";
import PendapatanReportPage from "../pages/admin/report/pendapatan";
import ProdukTerlarisReportPage from "../pages/admin/report/produk_terlaris";
import TreatmentTerlarisReportPage from "../pages/admin/report/treatment_terlaris";DokterReportPage
import DokterReportPage from "../pages/admin/report/laporan_doctor";
const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <div>
        <h1>Not Found</h1>
      </div>
    ),
  },
  {
    path: "/login",
    element: <LoginUser />,
  },
  {
    path: "/",
    element: <LoginUser />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoutes>
        <DashboardAdmin />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "admin/product",
        element: (
          <ProtectedRoutes allowedRoles={["Admin"]}>
            <ProductPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "admin/employee",
        element: (
          <ProtectedRoutes allowedRoles={["Admin"]}>
            <EmployeePage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "admin/treatment",
        element: (
          <ProtectedRoutes allowedRoles={["Admin"]}>
            <TreatmentPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "admin/room",
        element: (
          <ProtectedRoutes allowedRoles={["Admin"]}>
            <RoomPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "head-clinic/schedule",
        element: (
          <ProtectedRoutes allowedRoles={["Head Clinic"]}>
            <SchedulePage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "head-clinic/promo",
        element: (
          <ProtectedRoutes allowedRoles={["Head Clinic"]}>
            <PromoPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "head-clinic/report/customer_baru",
        element: (
          <ProtectedRoutes allowedRoles={["Head Clinic"]}>
            <CustomerReportPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "head-clinic/report/pendapatan",
        element: (
          <ProtectedRoutes allowedRoles={["Head Clinic"]}>
            <PendapatanReportPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "head-clinic/report/produk",
        element: (
          <ProtectedRoutes allowedRoles={["Head Clinic"]}>
            <ProdukTerlarisReportPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "head-clinic/report/treatment",
        element: (
          <ProtectedRoutes allowedRoles={["Head Clinic"]}>
            <TreatmentTerlarisReportPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "head-clinic/report/doctor",
        element: (
          <ProtectedRoutes allowedRoles={["Head Clinic"]}>
            <DokterReportPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "customer-service/customer",
        element: (
          <ProtectedRoutes allowedRoles={["Customer Service"]}>
            <CustomerPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "customer-service/transaksi",
        element: (
          <ProtectedRoutes allowedRoles={["Customer Service"]}>
            <TransactionPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "doctor/list-of-patients",
        element: (
          <ProtectedRoutes allowedRoles={["Doctor"]}>
            <ListPasienPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "doctor/riwayat-customer",
        element: (
          <ProtectedRoutes allowedRoles={["Doctor"]}>
            <TransactionPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "cashier/transaksi",
        element: (
          <ProtectedRoutes allowedRoles={["Cashier"]}>
            <CahsierPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "cashier/riwayat-transaksi",
        element: (
          <ProtectedRoutes allowedRoles={["Cashier"]}>
            <RiwayatTransaksiPage />
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
