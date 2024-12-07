import { FC } from 'react'

interface LogoProps {
    className?: string
}

export const Logo: FC<LogoProps> = ({ className = '' }) => {
    return (
        <div className={`flex items-center ${className}`}>
            <span className="text-4xl font-bold text-primary tracking-tight">Filltr</span>
        </div>
    )
}