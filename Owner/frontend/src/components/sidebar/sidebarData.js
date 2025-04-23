import HomeIcon from '@mui/icons-material/Home';
import PaymentsIcon from '@mui/icons-material/Payments';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import HomeWorkRoundedIcon from '@mui/icons-material/HomeWorkRounded';

const sidebardata = [

    {
        title: "Profile",
        path: "/Profile",
        icon: <PersonIcon/>
    },


    {
        title: "Home",
        path: "/Home",
        icon: <HomeIcon/>
    },

    {
        title: "Booking section",
        path: "/booking",
        icon: <CalendarMonthOutlinedIcon/>
    },

    {
        title: "Manage packages",
        path: "/package",
        icon: <HomeWorkRoundedIcon/>
    },

    {
        title: "Manage content",
        path: "/content",
        icon: <AppRegistrationOutlinedIcon/>
    },

    

    {
        title: "Payments",
        path: "/Payment",
        icon: <PaymentsIcon/>
    },

    {
        title: "Logout",
        path: "/",
        icon: <LogoutIcon/>
    }
]

export default sidebardata;