import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {authRoutes, EnumRoutes, publicRoutes} from '../utils/routes';
import {useTypedSelector} from "../hooks/redux";

const AppRouter = () => {
    const {isAuth} = useTypedSelector(state => state.userReducer)
    return (
        <Routes>
            {isAuth
                ?
                authRoutes.map(route => <Route key={route.path} path={route.path} element={route.element}/>)
                :
                publicRoutes.map(route => <Route key={route.path} path={route.path} element={route.element}/>)
            }
            <Route path="*" element={<Navigate to={isAuth ? EnumRoutes.main : EnumRoutes.auth}/>}/>
        </Routes>
    );
};

export default AppRouter;