import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/shared/layout';
import Dashboard from './pages/dashboard/dashboard';
import ClientDetails from './pages/dashboard/clientDetails/clientDetails';
import AdminDetails from './pages/dashboard/adminDetails/adminDetails';
import Billing from './pages/dashboard/clientDetails/billing';
import ClientDetailsLayout from './pages/dashboard/clientDetails/clientDetailsLayout';
import DisputeCenter from './pages/disputeCenter/disputeCenter';
import DisputeCenterLayout from './pages/disputeCenter/disputeCenterLayout';
import DisputeAccountDetails from './pages/disputeCenter/disputeAccountDetails';
import LetterCreationLayout from './pages/letterCreation/letterCreationLayout';
import LetterCreation from './pages/letterCreation/letterCreation';
import LetterCreationDetails from './pages/letterCreation/letterCreationDetails';
import Payment from './pages/payment';
import Notification from './pages/notification';
import Settings from './pages/settings/settings';
import Support from './pages/settings/support';
import Policy from './pages/settings/policy';
import EditProfile from './pages/settings/editProfile';
import Security from './pages/settings/security';
import NotFound from './pages/notFound';
import SettingsLayout from './pages/settings/settingsLayout';
// import { AuthContextProvider } from './context/authcontext';
import { Toaster } from 'react-hot-toast';
import Login from './components/authentication/login';
import AuthLayout from './components/authentication/authLayout';
import { AdminAuthContextProvider } from './context/adminAuthContext';
import ProtectedPage from './components/authentication/protectedPage';
// import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
// import 'primereact/resources/themes/saga-blue/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';







const App = () => {
    return(
        <AdminAuthContextProvider>
        {/* <PrimeReactProvider > */}

        {/* <AuthContextProvider> */}
        <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
            className: 'toaster',
            }}
        />
        {/* <PrimeReactProvider value={{ unstyled: true }}> */}

        <BrowserRouter>
            <Routes>
                <Route path='/' element={<AuthLayout />}>
                    <Route index element={<Login />} />
                </Route>

                <Route path='/dashboard' element={<ProtectedPage> <Layout /> </ProtectedPage>}>
                    <Route index element={<Dashboard/>} />
                    
                    <Route path='client_details' element={<ClientDetailsLayout />}>
                        <Route index path=':id' element={<ClientDetails/>} />
                        <Route path='billing' element={<Billing />} />
                    </Route>

                    <Route path='admin_details' element={<AdminDetails />} />

                    <Route path='dispute_center' element={<DisputeCenterLayout />}>
                        <Route index element={<DisputeCenter />} />
                        <Route path='dispute_account_details/:id' element={<DisputeAccountDetails />} />
                    </Route>

                    <Route path='letter_creation' element={<LetterCreationLayout />}>
                        <Route index element={<LetterCreation/>} />
                        <Route path='letter_creation_details/:id' element={<LetterCreationDetails />} />
                    </Route>

                    <Route path='payment' element={<Payment />} /> 

                    <Route path='notifications' element={<Notification />} />

                    <Route path='settings' element={<SettingsLayout />}>
                        <Route index element={<Settings />} />
                        <Route path='edit_profile' element={<EditProfile />} />
                        <Route path='security' element={<Security />} />
                        <Route path='support' element={<Support />} />
                        <Route path='policy' element={<Policy />} />                        
                    </Route>
                </Route>
                <Route path='*' element={<NotFound />} />
                
            </Routes>
        </BrowserRouter>
        {/* </PrimeReactProvider> */}

        {/* </AuthContextProvider> */}
        </AdminAuthContextProvider>


        
    );
};

export default App;