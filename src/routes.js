import MainLayout from "layouts/MainLayout";
import DashboardPage from "pages/DashboardPage";

export const authRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
    ],
  },
];
