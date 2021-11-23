import Ads from '../components/Ads/Ads';
import Home from '../components/Home/Home'
import NewAd from '../components/NewAd/NewAd';

const routes = [
    {
        path: '/',
        component: <Home/>,
        exact: true,
        id: 0
    },
    {
        path: '/ads',
        component: <Ads/>,
        id: 1
    },
    {
        path:'/newad',
        component: <NewAd/>,
        id: 2
    }
]

export default routes;