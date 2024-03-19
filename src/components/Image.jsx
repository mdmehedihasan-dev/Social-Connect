/* eslint-disable react/prop-types */

const Image = ({imgSrc,imgAlt,className}) => {
  return (
    <img className={`w-24 h-24 rounded-full ${className}`} src={imgSrc} alt={imgAlt} />
  )
}

export default Image