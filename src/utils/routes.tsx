import { ReactNode } from "react";
import Game from "../pages/Game";
import Games from "../pages/Games";
import Main from "../pages/Main";
import AuthPage from "../pages/AuthPage";

export interface IRoute {
    path: string,
    element: ReactNode
}
export enum EnumRoutes {
    main = "/",
    games = "/games",
    game = "/game/",
    auth= "/auth"
}
export const authRoutes: IRoute[] = [
    {
        element: <Games />,
        path: EnumRoutes.games
    },
    {
        element: <Game />,
        path: EnumRoutes.game
    },
    {
        element: <Main />,
        path: EnumRoutes.main
    },
]
export const publicRoutes: IRoute[] = [
    {
        element: <Games />,
        path: EnumRoutes.games
    },
    {
        element: <Game />,
        path: EnumRoutes.game
    },
    {
        element: <AuthPage/>,
        path:EnumRoutes.auth
    }
]