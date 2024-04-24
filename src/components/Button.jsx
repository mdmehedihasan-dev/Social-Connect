/* eslint-disable react/prop-types */

const Button = ({className,btnName, onClick}) => {
  return (
   <button onClick={onClick} className={`${className}  text-white font-mono font-semibold px-2 py-1 mt-2 rounded-md bg-blue-700 w-full md:w-96`}>{btnName}</button>
  )
}

export default Button