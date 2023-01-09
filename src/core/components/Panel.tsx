import React, {useEffect, useRef} from 'react'
import ReactDom from 'react-dom'
import {extract} from '~/core/helpers/react-helper'
import {AiFillClockCircle} from "react-icons/all";

const Portal = ({children}) => {
    return ReactDom.createPortal(children, document.body)
}

export const PanelTitle = ({children}) => {
    return <div className="px-8 pt-6 pb-4 w-full">{children}</div>
}
export const PanelContent = ({children}) => {
    return <div className="px-8 py-6 w-full">{children}</div>
}
export const PanelFooter = ({children}) => {
    return (
        <div className="bg-gray-200 px-4 py-3 text-right absolute bottom-0 w-full">
            {children}
        </div>
    )
}

const CloseButton = ({onClose, closeButton}) => {
    if (closeButton) {
        return (
            <button
                className="absolute top-0 left-0 w-8 h-8 flex items-center justify-center"
                onClick={onClose}
            >
                <AiFillClockCircle className="h-5 w-5"/>
            </button>
        )
    }
    return <div></div>
}

const Panel = ({
                   children,
                   isOpen,
                   onClose,
                   closeOnBackgroundClick,
                   closeButton,
                   panelSize
               }) => {
    panelSize = panelSize || 'max-w-3/4'
    closeButton = closeButton || false
    const {title, content, footer} = extract({
        title: PanelTitle,
        content: PanelContent,
        footer: PanelFooter,
    }).from(children)
    closeOnBackgroundClick = closeOnBackgroundClick || false
    const modalRef = useRef()

    useEffect(() => {
        if (!isOpen) return
        window.addEventListener('keydown', checkEscAndClosePanel)
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'auto'
            window.removeEventListener('keydown', checkEscAndClosePanel)
        }
    }, [isOpen])

    const checkEscAndClosePanel = (e) => {
        if (e.key !== 'Escape') return
        onClose()
    }

    const checkOutsideAndClosePanel = (e) => {
        if (modalRef.current.contains(e.target)) return
        if (closeOnBackgroundClick) {
            onClose()
        }
    }

    const wrapperClasses = () => {
        if (isOpen) return 'top-0 left-0 bottom-0 right-0'
        return 'w-0 h-0'
    }
    const modalClasses = () => {
        if (!isOpen) return 'opacity-0 translate-y-[80px]'
        return 'opacity-100'
    }

    return (
        <>
            <Portal>
                <div
                    className={`fixed z-[1000] ${wrapperClasses()} overflow-hidden flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm`}
                    onClick={checkOutsideAndClosePanel}
                >
                    <div
                        ref={modalRef}
                        className={`absolute ${panelSize} max-h-screen right-0 top-0 bottom-0 overflow-auto transition ease-in-out delay-150 duration-300 ${modalClasses()} bg-white rounded-tl-xl rounded-bl-xl z-[1000] shadow-lg w-full h-full border`}
                    >
                        <CloseButton
                            onClose={onClose}
                            closeButton={closeButton}
                        />
                        {title}
                        {content}
                        {footer}
                    </div>
                </div>
            </Portal>
        </>
    )
}

export default Panel
