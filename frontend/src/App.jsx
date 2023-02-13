import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Login, { action as loginAction } from './pages/Login';
import Register, {action as registerAction} from './pages/Register';
import Settings from './pages/Settings';
import ChangePassword from './components/settings_componets/ChangePassword';
import UserSettings from './components/settings_componets/UserSettings';
import VehicleRegistration, { action as vehicleRegistrationAction, loader as vehicleRegistrationLoader} from './pages/VehicleRegistration';
import AuthoriseDriver from './pages/AuthoriseDriver';
import DashboardIndex from './components/DashboardIndex';

export default function App(){

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Root/>,
            children: [
                {
                    path: 'login',
                    action: loginAction,
                    element: <ProtectedRoute isProtected={false}>
                        <Login />
                    </ProtectedRoute>
                }, 
                {
                    path: 'register',
                    action: registerAction,
                    element: <ProtectedRoute isProtected={false}>
                        <Register />
                    </ProtectedRoute>
                },
                {
                    path: 'dashboard',
                    element:(
                        <ProtectedRoute>
                            <Dashboard />,
                        </ProtectedRoute>
                    ),
                    children: [
                        {
                            index: true,
                            element: <DashboardIndex />
                        },
                        {
                            path: "register_vehicle",
                            element : (
                                <ProtectedRoute>
                                    <VehicleRegistration />
                                </ProtectedRoute>
                            ),    
                            action: vehicleRegistrationAction,
                            loader: vehicleRegistrationLoader,
                        },
                        {
                            path: "authorise_driver",
                            element : (
                                <ProtectedRoute>
                                    <AuthoriseDriver />
                                </ProtectedRoute>
                            )
                        },
                        {
                            path: 'settings',
                            element :(
                                <ProtectedRoute>
                                    <Settings />
                                </ProtectedRoute>
                            ), 
                            children:[,
                                {
                                    index: true,
                                    element: <ProtectedRoute><UserSettings /></ProtectedRoute>
                                },
                                {
                                    path: 'change_password',
                                    element:(
                                        <ProtectedRoute><ChangePassword /></ProtectedRoute>
                                    )
                                }
                            ]
                        }
                    ] 
                }
            ]
        },
    ]);

    // const router = createBrowserRouter(
    //     createRoutesFromElements(
    //         <Route path="/" element={<Root />}>
    //             <Route path="login" element={<ProtectedRoute isProtected={false}><Login /></ProtectedRoute>} />
    //             <Route path="dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
    //                 <Route path="settings" element={<ProtectedRoute><Settings/></ProtectedRoute>}/>
    //             </Route>
    //         </Route>
    //     )
    // )

    return <RouterProvider router={router} />
}




