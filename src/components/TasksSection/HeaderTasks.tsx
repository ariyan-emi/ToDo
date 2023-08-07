import React, {useState} from "react";
import BtnAddTask from "../Utilities/BtnAddTask";
import {ReactComponent as MenuIcon} from "../../assets/menu.svg";
import AppsIcon from '@mui/icons-material/Apps';
import SearchField from "./SearchField";
import {useAppDispatch} from "../../store/hooks";
import {menusActions} from "../../store/Menu.store";
import Notification from "./Notification";
import DarkMode from "../AccountSection/DarkMode";
import TasksDone from "../AccountSection/TasksDone";
import DeleteTasks from "../AccountSection/DeleteTasks";
import {If} from "../Service/condition";
import {BackDrop} from "../hooks/useBackDrop";

const HeaderTasks: React.FC = () => {
    const dispatch = useAppDispatch();
    let [BackState, BackSet] = useState(false);

    const date: Date = new Date();
    const year: number = date.getFullYear();
    const month: number = date.getMonth();
    const day: number = date.getDate();

    const monthName: string[] = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const todayDate = `${year}, ${monthName[month].slice(0, 3)} ${day
        .toString()
        .padStart(2, "0")}`;

    const dateTimeFormat = `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}}`;

    const openMenuHeaderHandler = () => {
        dispatch(menusActions.openMenuHeader());
    };
    const openMenuAccountHandler = () => {
        dispatch(menusActions.openMenuAccount());
    };

    return (
        <header className="items-center grid grid-cols-[1fr_auto_1fr] gap-4 md:gap-0 md:flex ">
            <button
                className="mr-6 block xl:hidden"
                onClick={openMenuHeaderHandler}
                title="open menu"
            >
                <MenuIcon/>
            </button>
            <SearchField/>
            <div className="text-center">
        <span className="text-slate-600 dark:text-slate-200 uppercase font-bold text-sm block xl:hidden">
          TODO
        </span>
                <TasksDone/>
            </div>
            <div className="flex flex-1">
                <Notification/>
                <DeleteTasks/>
                <DarkMode/>
                <BtnAddTask className="hidden xl:block shadow-slate-400  dark:shadow-slate-900 sm:shadow-transparent"/>
                <button
                    className="block xl:hidden"
                    onClick={() => {
                        BackState = true
                        BackSet(true)
                        setTimeout(() => {
                            localStorage.setItem('Alert', JSON.stringify("Showed"));
                        }, 2000);

                    }}
                >
                    <AppsIcon className="shadow-slate-400 dark:shadow-slate-900 sm:shadow-transparent"
                              style={{fontSize: 33}}/>
                </button>
                <If condition={BackState}>
                    <BackDrop BackState={BackState} BackSet={BackSet}/>
                </If>

            </div>
        </header>
    );
};

export default HeaderTasks;
