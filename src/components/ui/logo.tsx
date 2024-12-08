import { FC } from 'react'

interface LogoProps {
    className?: string
}

export const Logo: FC<LogoProps> = ({ className = '' }) => {
    return (
        <div className={`flex items-center ${className}`}>
            <span className="text-2xl font-bold tracking-tight text-primary dark:text-white">Filltr</span>
        </div>
    )
}