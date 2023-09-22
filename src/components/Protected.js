// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { AuthContext } from './AuthProvider'

// function PrivateRoute({ component: Component, ...rest }) {
//   const { user } = AuthContext();

//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         return user ? <Component {...props} /> : <Navigate to="/" />;
//       }}
//     />
//   );
// }

// export default PrivateRoute;
