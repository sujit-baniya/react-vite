import {useState} from 'react'

const Switch = ({switchedOn, className, title, onToggle, textSize}) => {
    switchedOn = switchedOn || false
    textSize = textSize || 'text-sm'
    const [toggle, setToggle] = useState(switchedOn)
    useEffect(() => {
        setToggle(switchedOn)
    }, [switchedOn])
    const switchToggle = () => {
        setToggle(!toggle)
        if (onToggle) {
            onToggle(toggle)
        }
    }
    return (
        <div
            className={`flex justify-between space-x-1 grid place-items-center cursor-pointer ${className}`}
            onClick={switchToggle}
        >
            <div
                className={
                    'h-3 w-8 flex items-center rounded-full ' +
                    (!toggle ? ' bg-gray-300' : ' bg-blue-400')
                }
                onClick={() => {
                    setToggle(!toggle)
                }}
            >
                <div
                    className={
                        'bg-white h-4 w-4 rounded-full border border-gray-200 shadow-md transform duration-300 ease-in-out' +
                        (!toggle ? '' : ' transform translate-x-4')
                    }
                ></div>
            </div>
            <span className={`whitespace-nowrap ${textSize}`}>{title}</span>
        </div>
    )
}

export default Switch
