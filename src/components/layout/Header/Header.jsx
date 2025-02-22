import {
    Settings,
    Notifications,
} from "@mui/icons-material";

const Header = () => {
    return (
        <header className="bg-white shadow-sm">
            <div className="flex items-center justify-end px-8 py-4">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Settings className="w-5 h-5 text-gray-600"/>
                </button>
                <button className="p-2 ml-2 hover:bg-gray-100 rounded-full">
                    <Notifications className="w-5 h-5 text-gray-600"/>
                </button>
                <div className="ml-4 flex items-center">
                    <img
                        src="/vite.svg"
                        alt="Profile"
                        className="w-8 h-8 rounded-full"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                Ronald Richards
              </span>
                </div>
            </div>
        </header>
    );
};

export default Header;