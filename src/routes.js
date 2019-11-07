import Id1 from './pages/Id1'
import Id2 from './pages/Id2'
import Id3 from './pages/Id3'
import Id4 from './pages/Id4'
import SubId1 from './pages/SubId1'
import ShowQueue from './pages/ShowQueue'
import Regis from './pages/Regis'

const routes = [
    { path: '/Id1', component: Id1, name: "Id1" },
    { path: '/Id2', component: Id2, name: "Id2" },
    { path: '/Id3', component: Id3, name: "Id3"},
    { path: '/Id4', component: Id4, name: "Id4"},
    { path: '/SubId1', component: SubId1, name: "SubId1"},
    { path: '/SubId2', component: SubId1, name: "SubId2"},
    { path: '/SubId3', component: SubId1, name: "SubId3"},
    { path: '/ShowQueue', component: ShowQueue, name: "ShowQueue"},
    { path: '/Regis', component: Regis, name: "Regis"},
]

export default routes;