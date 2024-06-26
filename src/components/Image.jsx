/* eslint-disable react/prop-types */

const Image = ({imgSrc,imgAlt,className}) => {
  return (
    <img className={`w-12 h-12 rounded-full ${className}`} src={imgSrc} alt={imgAlt} />
  )
}

export default Image