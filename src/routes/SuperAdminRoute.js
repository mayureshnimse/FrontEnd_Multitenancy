// import { Route, Navigate, Outlet } from 'react-router-dom';
// import { useUser } from '../context/UserContext';
// import React from 'react'

// const SuperAdminRoute = ({ element, ...rest }) => {
//     const { userIsSuperadmin } = useUser();
//     return (
//         <Route
//           {...rest}
//           element={
//             userIsSuperadmin ? element : <Navigate to="/login" />
//           }
//         />
//       );
// }

// export default SuperAdminRoute