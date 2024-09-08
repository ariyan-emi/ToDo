import MobileAccountData from "../AccountSection/MobileAccountData";
import {ReactComponent as X} from "../../assets/x.svg";
export function BackDrop({ BackState, BackSet }:{BackState:boolean,BackSet:any}){
    return (
        <>
            <div className="Backdrop">
                <X className="xTop absolute w-8 h-8 lg:w-12 lg:h-12 bold text-black dark:text-violet-700" onClick={()=>{
                  BackState = false
                  BackSet(false)
                }}/>
                <MobileAccountData BackState={BackState} BackSet={BackSet}/>
            </div>
        </>
        )

}