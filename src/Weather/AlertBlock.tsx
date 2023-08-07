
import React, { useState} from "react";
import Button from './button/Button';
import Modal, { ModalBody, ModalFooter, ModalHeader } from './modal/Modal';
export function AlertBlock() {
    const [show, setShow] = useState(true)

    return(
            <div>
                <Modal
                    show={show}
                    setShow={setShow}
                >
                    <ModalHeader>
                        <h2>Alert <strong> Weather</strong></h2>
                    </ModalHeader>
                    <ModalBody>
                        <p style={{ textAlign: 'justify' }}>
                            As a result of the sanctions imposed on your country, certain capabilities are now
                            inaccessible for use. <br/>or maybe the API has expired
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => setShow(false)}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )

}
