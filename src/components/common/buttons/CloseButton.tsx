import { MouseEvent } from "react"
import { FaTimes } from "react-icons/fa"

interface CloseButtonProps {
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void,
    top?: string
  }
  
  const CloseButton = ({ onClick, top = '1/2' }: CloseButtonProps) => {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`button absolute top-${top} right-[0px] px-2 -translate-y-1/2 text-gray-400 hover:text-red-500 p-0 m-0 bg-transparent border-none`}
      >
        <FaTimes className="w-3 h-3 pointer-events-none p-0" />
      </button>
    )
  }
  
  export default CloseButton
  
  