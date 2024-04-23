import React from "react";
import MainPage from "../../pages/MainPage";
import NotFoundPage from "../../pages/NotFoundPage";
import AdminPage from "../../pages/AdminPage";
import ExplorerPage from "../../pages/ExplorerPage";

export const AppRoutes = Object.freeze({
    MAIN: 'main',
    ADMIN: 'admin',
    EXPLORER: 'explorer',
    NOT_FOUND: 'not_found',
})

export const RoutePath = Object.freeze({
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ADMIN]: '/admin',
    [AppRoutes.EXPLORER]: '/explorer',
    [AppRoutes.NOT_FOUND]: '*',
})

export const routeConfig = Object.freeze({
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />
    },
    [AppRoutes.ADMIN]: {
        path: RoutePath.admin,
        element: <AdminPage />
    },
    [AppRoutes.EXPLORER]: {
        path: RoutePath.explorer,
        element: <ExplorerPage />
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />
    }
});
