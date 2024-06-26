/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";



const ThemeProvider = ({children}) => {
    const {theme} = useSelector((state)=>state.theme)
  return (
    <div className={theme}>
         <div className="min-h-screen text-gray-600 bg-white dark:text-gray-200 dark:bg-dark">
       {children}
       </div>
    </div>
  )
}

export default ThemeProvider