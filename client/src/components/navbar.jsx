import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
            <Link to="/" className="text-2xl font-bold hover:text-blue-600">
                Book a Ticket
            </Link>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-6">
                    <Link to="/" className="text-gray-700 hover:text-blue-600">
                        Home
                    </Link>
                    <Link to="/events" className="text-gray-700 hover:text-blue-600">
                        Events
                    </Link>
                    <Link to="/about" className="text-gray-700 hover:text-blue-600">
                        About
                    </Link>
                </div>

                <div className="w-px h-6 bg-gray-300 mx-4"></div>

                <Link to="/profile" className="flex items-center gap-2 hover:underline">
                    <img
                        src="https://i.pravatar.cc/32"
                        alt="Avatar"
                        className="w-8 h-8 rounded-full"
                    />
                    <span className="text-gray-700"></span>
                </Link>
            </div>
        </nav>
    );
}
