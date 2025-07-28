import { MouseEventHandler, ReactNode, ComponentPropsWithoutRef } from 'react'

interface ClearButtonProps extends ComponentPropsWithoutRef<'button'> {
  onClick: MouseEventHandler<HTMLButtonElement>
  className?: string
  children: ReactNode
}

const ClearButton = ({ onClick, className = '', children, ...rest }: ClearButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        button
        text-gray-600 hover:text-blue-500
        p-2 m-0 bg-transparent border-none cursor-pointer
        ${className}
      `}
      {...rest}
    >
      {children}
    </button>
  )
}

export default ClearButton
