import { useEffect, useRef } from 'react';
import './modal.scss';

const Modal = props => {
    const modalRef = useRef();

    useEffect(() => {
        const clickOutsideContent = (e) => {
            if (e.target === modalRef.current) {
                props.setShow(false);
            }
        };
        window.addEventListener('click', clickOutsideContent);
        return () => {
            window.removeEventListener('click', clickOutsideContent);
        };
    }, [props]);

    return <div ref={modalRef} className={`modal ${props.show ? 'active' : ''}`}>
        <div className="modal__content">
            {
                !props.hideCloseButton && <span onClick={() => props.setShow(false)} className="modal__close">
                    &times;
                </span>
            }
            {props.children}
        </div>
    </div>;
};

export default Modal;

export const ModalHeader = props => {
    return <div className="modal__header">
        {props.children}
    </div>
}

export const ModalBody = props => {
    return <div className="modal__body">
        {props.children}
    </div>
}

export const ModalFooter = props => {
    return <div className="modal__footer">
        {props.children}
    </div>
}
