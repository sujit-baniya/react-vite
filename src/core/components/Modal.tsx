import React, {useEffect, useRef} from 'react'
import ReactDom from 'react-dom'
import {extract} from '~/core/helpers/react-helper'
import {AiFillClockCircle} from "react-icons/all";

const Portal = ({children}) => {
    return ReactDom.createPortal(children, document.body)
}

export const ModalTitle = ({className, children}) => {
    className = className || "px-8 py-6"
    return <div className={`${className} w-full`}>{children}</div>
}
export const ModalContent = ({className, children}) => {
    className = className || "px-8 py-6"
    return <div className={`${className} w-full`}>{children}</div>
}
export const ModalFooter = (props) => {
    return (
        <div className={`bg-gray-200 px-4 py-3 text-right absolute bottom-0 w-full ${props.className}`}>
            {props.children}
        </div>
    )
}

const CloseButton = ({onClose, closeButton}) => {
    if (closeButton) {
        return (
            <button
                className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center"
                onClick={onClose}
            >
                <AiFillClockCircle className="h-5 w-5"/>
            </button>
        )
    }
    return <div></div>
}

const Modal = ({
                   children,
                   isOpen,
                   onClose,
                   closeOnBackgroundClick,
                   closeButton,
                   size,
                   position
               }) => {
    closeButton = closeButton || false
    position = position || "center"
    size = size || "max-w-[500px] max-h-[400px]"
    const {title, content, footer} = extract({
        title: ModalTitle,
        content: ModalContent,
        footer: ModalFooter,
    }).from(children)
    closeOnBackgroundClick = closeOnBackgroundClick || false
    const modalRef = useRef()

    useEffect(() => {
        if (!isOpen) return
        window.addEventListener('keydown', checkEscAndCloseModal)
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'auto'
            window.removeEventListener('keydown', checkEscAndCloseModal)
        }
    }, [isOpen])

    const getModalPosition = () => {
        switch (position) {
            case "top-center":
                return "items-start justify-center pt-5"
            case "top-left":
                return "items-start justify-start pt-5 pl-5"
            case "top-right":
                return "items-start justify-end pt-5 pr-5"
            case "bottom-center":
                return "items-end justify-center pb-5"
            case "bottom-left":
                return "items-end justify-start pb-5 pl-5"
            case "bottom-right":
                return "items-end justify-end pb-5 pr-5"
            default:
                return "items-center justify-center"
        }
    }
    const checkEscAndCloseModal = (e) => {
        if (e.key !== 'Escape') return
        onClose()
    }

    const checkOutsideAndCloseModal = (e) => {
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
                    className={`fixed z-[1000] ${wrapperClasses()} overflow-hidden flex ${getModalPosition()} bg-black bg-opacity-40 backdrop-blur-sm`}
                    onClick={checkOutsideAndCloseModal}
                >
                    <div
                        ref={modalRef}
                        className={`absolute ${size} overflow-auto transition ease-in-out duration-300 ${modalClasses()} bg-white rounded-xl z-[1000] shadow-lg w-full h-full`}
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

export default Modal
