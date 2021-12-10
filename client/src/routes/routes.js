import Ads from '../components/Ads/Ads';
import Unauthorized from '../components/Errors/Unauthorized';
import Home from '../components/Home/Home'
import NewAd from '../components/NewAd/NewAd';
import Profile from '../components/Profile/Profile';

const routes = [
    {
        path: '/',
        component: <Home />,
        exact: true,
        id: 0
    },
    {
        path: '/ads',
        component: <Ads />,
        id: 1
    },
    {
        path: '/newad',
        component: <NewAd />,
        id: 2
    },
    {
        path: '/profile',
        component: <Profile />,
        id: 3
    },
    {
        path: '/unauth',
        component: <Unauthorized />
    }
]

export default routes;