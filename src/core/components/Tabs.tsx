import {useState} from "react";

// @ts-ignore
export const Tabs = (props) => {
    let position = props.position || "top"
    let children = props.children
    let className = props.className || ''
    let bgColor = props.bgColor || 'bg-gray-100'
    let justify = props.justify || 'justify-left'
    if (!Array.isArray(children)) {
        children = [children]
    }
    let selectedTab = props.selectedTab || (children.length >= 1 ? children[0].props.id : '')
    let padding = props.padding || 'p-5'
    const [activeTab, setActiveTab] = useState(selectedTab);
    return (
        <>
            <div className={`${className} w-full ${position === 'left' ? "flex flex-row" : ""}`}>
                <div className={`flex gap-1 ${justify} ${bgColor} px-1 ${position === 'left' ? 'flex-col' : ''}`}>
                    {children.map((item, i) => {
                        let childClassName = item.props.className || ''
                        return (
                            <Tab
                                key={item.props.id}
                                currentTab={item.props.id}
                                padding={item.props.padding}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                position={position}
                                borderColor={item.props.borderColor}
                                currentBorderColor={item.props.currentBorderColor}
                                className={childClassName}
                            >
                                {item.props.title}
                            </Tab>
                        );
                    })}
                </div>
                <div className={`w-full ${padding}`}>
                    {children.map((item, i) => {
                        return (
                            <div className={` ${item.props.id === activeTab ? "visible" : "hidden"}`} key={i}>
                                {item.props.children}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

// @ts-ignore
export const Tab = (props) => {
    let children = props.children
    let activeTab = props.activeTab
    let currentTab = props.currentTab
    let setActiveTab = props.setActiveTab
    let position = props.position || "top"
    let padding = props.padding || 'pl-5 pr-10 py-2'
    let borderColor = props.borderColor || 'hover:border-b-blue-400'
    let currentBorderColor = props.currentBorderColor || 'border-b-blue-400'
    let className = (props.className || '') + ' uppercase'
    let activeTabColor = props.activeTabColor || 'text-black'
    let inactiveTabColor = props.inactiveTabColor || 'text-gray-400 hover:text-black'
    let border = `border-b-2 hover:border-b-2 ${borderColor}`;
    switch (position) {
        case 'left':
            border = `border-r-4 hover:border-r-2 hover:border-r-${borderColor}-400`
            break;
        default:
            break
    }
    return (
        <>
            <div
                className={`${className} ${padding} mt-1 ${border} cursor-pointer hover:bg-white
                ${activeTab === currentTab ? `bg-white ${currentBorderColor} ${activeTabColor}` : `border-b-gray-200 ${inactiveTabColor}`}`}
                onClick={() => setActiveTab(currentTab)}
            >
                {children}
            </div>
        </>
    );
}
