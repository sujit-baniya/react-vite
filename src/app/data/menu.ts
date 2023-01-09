import { BiHome, BiSupport, MdHome, RiFlowChart } from "react-icons/all";
import {MdOutlineDashboard} from "react-icons/md";

export const menuItems = [
    {
        "title": "Home",
        "icon": MdHome,
        "path": "/"
    },
    {
        "title": "Dashboard",
        "icon": MdOutlineDashboard,
        "path": "/dashboard"
    },
    {
        "title": "Encounter",
        "icon": RiFlowChart,
        "children": [
            {
                "title": "View Encounter",
                "icon": RiFlowChart,
                "path": "/encounter"
            },
            {
                "title": "Search Encounters",
                "icon": RiFlowChart,
                "path": "/encounter/search"
            },
        ]
    },
    {
        "title": "Help & Support",
        "icon": BiSupport,
        "path": "/support"
    },
]