// rendered by showpet
// state for open or not, lives in show pet
// state and update func assoc with that state is passed here as a prop

import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import PetForm from '../shared/PetForm'
import messages from '../shared/AutoDismissAlert/messages'

const EditPetModal = (props) => {
    // destructure our props
    const { user, show, handleClose, updatePet, msgAlert, triggerRefresh } = props

    const [pet, setPet] = useState(props.pet)

    const onChange = (e) => {
        e.persist()

        setPet(prevPet => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            if (updatedName === 'adoptable' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'adoptable' && !e.target.checked) {
                updatedValue = false
            }

            const updatedPet = {
                [updatedName] : updatedValue
            }

            return {
                ...prevPet, ...updatedPet
            }
        })
        
    }

    const onSubmit = (e) => {
        e.preventDefault()
        
        updatePet(user, pet)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Oh yea!',
                    message: messages.updatePetSuccess,
                    variant: 'success'
                })
            })
            // if plan works, update show page
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'oh no!',
                    message: messages.updatePetFailure,
                    variant: 'danger'
                })

            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <PetForm 
                    pet={pet} 
                    handleChange={onChange} 
                    handleSubmit={onSubmit}
                    heading="Update Pet" 
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditPetModal