import { Link } from 'react-router-dom';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { useContext } from 'react';
import { DataContext } from '../DataProvider';


export default function Navbar() {
    const {user} = useContext(DataContext);
    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
            <Link to="/" className="text-2xl font-bold hover:text-blue-600">
                Book a Ticket
            </Link>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-6">
                    <NavigationMenu viewport={false}>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link to="/" className="text-gray-700 hover:text-blue-600">
                                        Home
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link to="/about" className="text-gray-700 hover:text-blue-600">
                                        About
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Events</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <NavigationMenuLink asChild>
                                        <Link to="/events" className="text-gray-700 hover:text-blue-600">
                                            All events
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link to="/upcoming" className="text-gray-700 hover:text-blue-600">
                                            Upcoming
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link to="/calendar" className="text-gray-700 hover:text-blue-600">
                                            Calendar
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="w-px h-6 bg-gray-300 mx-4"></div>
                {user ? (<Link to="/profile" className="flex items-center gap-2 hover:underline">
                    <img
                        src="https://i.pravatar.cc/32"
                        alt="Avatar"
                        className="w-8 h-8 rounded-full"
                    />
                    <span className="text-gray-700">{user.firstName}</span>
                </Link>) : <Link to="/login" className="hover:underline">Login</Link>}
            </div>
        </nav>
    );
}
