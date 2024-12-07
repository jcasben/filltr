import { useEffect } from 'react'
import { X } from 'lucide-react'

interface SnackbarProps {
    message: string
    isVisible: boolean
    onClose: () => void
}

export function Snackbar({ message, isVisible, onClose }: SnackbarProps) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose()
            }, 3000)

            return () => clearTimeout(timer)
        }
    }, [isVisible, onClose])

    if (!isVisible) return null

    return (
        <div className="fixed bottom-20 left-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-md flex justify-between items-center">
            <span>{message}</span>
            <button onClick={onClose} className="text-white">
                <X size={20} />
            </button>
        </div>
    )
}