import type {ComponentPropsWithoutRef, ElementType, ReactNode} from 'react'
import clsx from 'clsx'

type CardProps<T extends ElementType> = {
    as?: T
    children: ReactNode
    className?: string
    rounded?: boolean
} & ComponentPropsWithoutRef<T>

export const Card = <T extends ElementType = 'div'>({as, children, className, rounded}: CardProps<T>) => {
    const Component = as || 'div'
    let Rounded = ''
    if (typeof rounded !== 'undefined') {
        if (rounded) {
            Rounded = 'rounded-xl'
        }
    }
    return (
        <Component
            className={clsx(
                'border border-gray-200 bg-gray-100 shadow-sm',
                className,
              Rounded
            )}
        >
            {children}
        </Component>
    )
}
