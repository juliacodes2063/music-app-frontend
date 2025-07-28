import { useEffect, useState } from 'react'

export const useIsTouchDevice = () => {
    const [isTouch, setIsTouch] = useState(false)

    useEffect(() => {
        setIsTouch(
            'ontouchstart' in window || navigator.maxTouchPoints > 0
        )
    }, [])

    return isTouch
}
