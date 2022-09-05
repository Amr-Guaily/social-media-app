import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './components/index';
import { UploadProvider } from './context/UploadContext';
import {
  Login,
  Signup,
  Home,
  CreatePin,
  Categories,
  UserProfile,
  PinDetails,
} from './pages/index';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/*" element={<PrivateRoute />}>
          <Route path="/*" element={<Home />} />
        </Route>

        <Route path="/create-pin" element={<PrivateRoute />}>
          <Route
            path=""
            element={
              <UploadProvider>
                <CreatePin />
              </UploadProvider>
            }
          />
        </Route>

        <Route path="/category/:categoryName" element={<PrivateRoute />}>
          <Route path="" element={<Categories />} />
        </Route>
        <Route path="/pin-details/:pinId" element={<PrivateRoute />}>
          <Route path="" element={<PinDetails />} />
        </Route>
        <Route path="/user-profile/:userId" element={<PrivateRoute />}>
          <Route path="" element={<UserProfile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
