// // App.js

// import React, { useEffect, useState } from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Switch,
//   Redirect,
//   useLocation,
// } from "react-router-dom";
// import Login from "../Login/Login2";
// import FormSelect from "../formSelect/formSelect2";
// import cameraForm from "../Camera/cameraForm";
// import MobileWebCam2 from "../Camera/Mobile/CameraMobile";
// import CameraForm from "../Camera/cameraForm";
// import { CustomLayout } from "./Layout";
// function PageTitleUpdater() {
//   const location = useLocation();

//   React.useEffect(() => {
//     const path = location.pathname;
//     let pageTitle = "IWAKI"; // Đặt tiêu đề mặc định

//     // Cập nhật tiêu đề dựa trên URL
//     if (path === "/") {
//       pageTitle = "FormSelect";
//     }
//     // Cập nhật tiêu đề trang
//     document.title = pageTitle;
//   }, [location]);

//   return null;
// }
// function Main() {
//   const [lsPermissions, setLsPermissions] = useState([]);
//   const [lsPermissionsType, setLsPermissionsType] = useState([]);
//   const auth = sessionStorage.getItem("token");
//   const userInfo = sessionStorage.getItem("userInfo");
//   // useEffect(() => {
//   //   if (auth === true) {
//   //     const userInfo = sessionStorage.getItem("userInfo");
//   //   }
//   // }, [auth]);
//   useEffect(() => {
//     if (userInfo !== null && userInfo !== undefined) {
//       let userInfoo = JSON.parse(userInfo);
//       console.log(userInfoo);
//       setLsPermissions([userInfoo.user_role_title]);
//       console.log([userInfoo.user_role_title]);
//     }
//   }, [userInfo]);

//   return (
//     <Router>
//       <PageTitleUpdater />
//       <Switch>
//         <ProtectLoginRoute
//           exact
//           path="/login"
//           protect={auth}
//           user_info={userInfo}
//         >
//           <Login />
//         </ProtectLoginRoute>
//         <RouteWithoutLayout
//           component={FormSelect}
//           path="/"
//           isPrivate={true}
//           lsPermissions={lsPermissions}
//           permission={["APP_USER"]}
//           isLogged={auth}
//         />
//         <RouteWithoutLayout
//           component={CameraForm}
//           path="/CaptureCamera"
//           isPrivate={false}
//           layout={CustomLayout}
//           // lsPermissions={lsPermissions}
//           // permission={["APP_USER"]}
//           // isLogged={auth}
//         />
//       </Switch>
//     </Router>
//   );
// }
// const RouteWithoutLayout = (props) => {
//   const {
//     isLogged: isLogged,
//     component: Component,
//     isPrivate: isPrivate,
//     lsPermissions: lsPermissions,
//     permission: permission,
//     path: path,
//     ...rest
//   } = props;
//   const getRejectRoute = (type) => {
//     // if (type !== "404" && path !== "/") {
//     //   type = "403";
//     // }
//   };
//   return (
//     <Route
//       {...rest}
//       render={() =>
//         isPrivate ? (
//           isLogged ? (
//             lsPermissions && lsPermissions.length > 0 ? (
//               lsPermissions.some((r) => permission.includes(r)) ? (
//                 <Component
//                   isLogged={isLogged}
//                   permission={lsPermissions}
//                   {...props}
//                 />
//               ) : (
//                 getRejectRoute(permission)
//               )
//             ) : (
//               <span></span>
//             )
//           ) : (
//             <Redirect
//               to={{
//                 pathname: "/login",
//                 state: { from: props.location },
//               }}
//             />
//           )
//         ) : (
//           <Component
//             // isLogged={isLogged}
//             // permission={lsPermissions}
//             {...props}
//           />
//         )
//       }
//     />
//   );
// };

// const RouteWithLayout = (props) => {
//   const {
//     isLogged: isLogged,
//     component: Component,
//     isPrivate: isPrivate,
//     lsPermissions: lsPermissions,
//     permission: permission,
//     layout: Layout,

//     path: path,
//     ...rest
//   } = props;

//   const getRejectRoute = (type) => {
//     if (type !== "404" && path !== "/") {
//       type = "403";
//     }
//   };
//   return (
//     <Route
    
//       {...rest}
//       render={() =>
//         isPrivate ? (
//           isLogged ? (
//             lsPermissions && lsPermissions.length > 0 ? (
//               lsPermissions.some((r) => permission.includes(r)) ? (
//                 <CustomLayout isLogged={isLogged}>
//                   <Component {...props} />
//                 </CustomLayout>
//               ) : (
//                 getRejectRoute(permission)
//               )
//             ) : (
//               <span></span>
//             )
//           ) : (
//             <Redirect
//               to={{
//                 pathname: "/login",
//                 state: { from: props.location },
//               }}
//             />
//           )
//         ) : (
//           <Layout isLogged={isLogged}>
//             <Component {...props} />
//           </Layout>
//         )
//       }
//     />
//   );
// };
// const ProtectLoginRoute = ({
//   protect,
//   lsPermissionsType,
//   lsPermissions,
//   user_info,
//   children,
//   ...rest
// }) => {
//   return (
//     <>
//       <Route
//         {...rest}
//         render={() =>
//           !protect ? (
//             children
//           ) : (
//             <>
//               <Redirect to="/"></Redirect>
//             </>
//           )
//         }
//       />
//     </>
//   );
// };
// export default Main;
