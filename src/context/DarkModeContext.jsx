import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import PropTypes from 'prop-types'


const DarkModeContext = createContext();

function DarkModeProvider({children}){
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");

    function toggleDarkMode(){
        setIsDarkMode(isDarkMode => !isDarkMode)
    }

    useEffect(() =>{
        if(isDarkMode){
            document.documentElement.classList.add("dark-mode");
            document.documentElement.classList.remove("light-mode");
        }
        if(!isDarkMode){
            document.documentElement.classList.add("light-mode");
            document.documentElement.classList.remove("dark-mode");
        }
    }, [isDarkMode])

    return (
        <DarkModeContext.Provider value={{isDarkMode, toggleDarkMode}}>
            {children}
        </DarkModeContext.Provider>
    )
}

function useDarkMode(){
    const context = useContext(DarkModeContext);
    if(context === undefined) throw new Error("useDarkMode was used outside the context provider");
    return context;
}

export {useDarkMode, DarkModeProvider};

DarkModeProvider.propTypes = {
    children: PropTypes.any.isRequired,
  };
  