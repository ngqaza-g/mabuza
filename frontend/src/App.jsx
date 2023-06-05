import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Login, { action as loginAction } from './pages/Login';
import Register, {action as registerAction} from './pages/Register';
import Settings from './pages/Settings';
import ChangePassword from './components/settings_componets/ChangePassword';
import UserSettings from './components/settings_componets/UserSettings';
import VehicleRegistration, { action as vehicleRegistrationAction, loader as vehicleRegistrationLoader} from './pages/VehicleRegistration';
import AuthorisedDrivers, {loader as authorised_drivers_loader, action as authorised_drivers_action} from './pages/AuthorisedDrivers';
import DashboardIndex, {loader as dashboardLoader} from './components/DashboardIndex';
import AuthorisedVehicles, {loader as authorised_vehicles_loader, action as authorised_vehicles_action} from './pages/AuthorisedVehicles';
import ImageUpload, { action as imageUploadAction } from './pages/ImageUpload';
import Gallery, { loader as galleryLoader } from './pages/Gallery';

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
                    path: 'upload_images',
                    action: imageUploadAction,
                    element: <ProtectedRoute isProtected={true}>
                        <ImageUpload />
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
                            element: <DashboardIndex />,
                            loader: dashboardLoader
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
                            path: 'gallery',
                            element: (
                                <ProtectedRoute>
                                    <Gallery />
                                </ProtectedRoute>
                            ),
                            loader: galleryLoader
                        },
                        {
                            path: "authorised_drivers/:licence_plate_number",
                            loader: authorised_drivers_loader,
                            action: authorised_drivers_action,
                            element : (
                                <ProtectedRoute>
                                    <AuthorisedDrivers />
                                </ProtectedRoute>
                            )
                        },
                        {
                            path: "authorised_vehicles",
                            loader: authorised_vehicles_loader,
                            action: authorised_vehicles_action,
                            element : (
                                <ProtectedRoute>
                                    <AuthorisedVehicles />
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




