import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {menusActions} from "../../store/Menu.store";
import LayoutMenus from "../Utilities/LayoutMenus";
import {GameHooks} from "./HookState";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import {ReactComponent as Close} from "../../assets/x.svg";
import {ReactComponent as GameBar} from "../../assets/gameboy.svg";
import {ReactComponent as TicTac} from "../../assets/tic-tac-toe.svg";
import {ReactComponent as GameIcon2048} from "../../assets/2048.svg";
import Weather from "../../Weather/WeatherApp";
import GameTicTac from "../../game/TicTacToe/Game/Game";
import {ElseIf, If} from "../Service/condition";
import GamePuzzle from "../../game/Puzzle/App";


const AccountData: React.FC = () => {

    const menuOpen = useAppSelector((state) => state.menu.menuAccountOpened);

    const dispatch = useAppDispatch();

    const [GameState, GameSet] = useState({game: "none", parentDiv: "DontShow"})
    GameHooks.GameState = GameState
    GameHooks.GameSet = GameSet

    const closeMenuHandler = () => {
        dispatch(menusActions.closeMenuAccount());
    };
    setTimeout(() => {
        localStorage.setItem('Alert', JSON.stringify("Showed"));
    }, 2000);

    function ClassSwicher(Bar: string) {
        switch (Bar) {
            case 'none':
                return 'BarDisable'
            case 'GameBar':
                return 'GameBar'
            case 'DontShow':
                return 'DontShow'
            case 'Show':
                return 'Show'
        }
    }

    return (
        <div >
                        <LayoutMenus
                            menuOpen={menuOpen}
                            closeMenuHandler={closeMenuHandler}
                            className="top-0 right-0 w-fit h-fit"
                        >

                            <If condition={GameHooks.GameState.game === "TicTacToe"}>
                                <div className={ClassSwicher(GameHooks.GameState.parentDiv)}>
                                    <Close className="text-slate-400 xIconBig" onClick={() => {
                                        GameState.game = "none"
                                        GameState.parentDiv = "DontShow"
                                        GameSet({...GameState})
                                    }}/>
                                    <GameTicTac/>
                                </div>
                            </If>
                            <ElseIf condition={GameHooks.GameState.game === "2048"}>
                                <div className={ClassSwicher(GameHooks.GameState.parentDiv)}>
                                    <Close className="text-slate-400 xIconBig" onClick={() => {
                                        GameState.game = "none"
                                        GameState.parentDiv = "DontShow"
                                        GameSet({...GameState})
                                    }}/>
                                    <GamePuzzle/>
                                </div>
                            </ElseIf>
                            <ElseIf condition={GameState.game === "GameBar" && GameState.parentDiv === "Show"}>
                                <div className="ScrollBars screender">
                                    <div className={ClassSwicher(GameHooks.GameState.parentDiv)}>

                                        <div className="GameBarMobile" style={{opacity: 1}}>

                                            <button className="m-10" onClick={() => {
                                                GameState.game = "2048"
                                                GameState.parentDiv = "Show"
                                                GameSet({...GameState})
                                            }}>
                                                <button className="button-29" role="button"><GameIcon2048
                                                    className="h-20 w-20 m-8"/></button>
                                            </button>
                                            <button onClick={() => {
                                                GameState.game = "TicTacToe"
                                                GameState.parentDiv = "Show"
                                                GameSet({...GameState})
                                            }}>
                                                <button className="button-29" role="button"><TicTac className="h-20 w-20 m-8"/>
                                                </button>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </ElseIf>
                        </LayoutMenus>
        </div>
    );
};

export default AccountData;
