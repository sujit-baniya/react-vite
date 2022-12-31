import React from 'react'

export const find = (component) => ({
    in: (element) =>
        React.Children.toArray(element).filter(
            ({type}) => type === component
        ),
})

export const extract = (map) => ({
    from: (element) =>
        Object.entries(map).reduce(
            (stack, [key, value]) =>
                Object.assign(stack, {[key]: find(value).in(element)}),
            {}
        ),
})
