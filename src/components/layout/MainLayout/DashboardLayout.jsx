import Sidebar from "../Sidebar/Sidebar.jsx";
import Header from "../Header/Header.jsx";
import {Outlet} from "react-router-dom";

const DashboardLayout = () => {


    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1">
                {/* Header */}
               <Header />

                {/* Page Content */}
                <main className="p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
