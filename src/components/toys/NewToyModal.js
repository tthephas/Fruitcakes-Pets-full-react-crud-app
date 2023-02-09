import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ToyForm from '../shared/ToyForm'
import { createToy } from '../../api/toys'

const NewToyModal = (props) => {
    const { user, pet, show, handleClose, msgAlert, triggerRefresh } = props

    const [toy, setToy] = useState({})

    const onChange = (e) => {
        e.persist()

        setToy(prevToy => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            //handle check box
            if (updatedName === 'isSqueaky' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'isSqueaky' && !e.target.checked) {
                updatedValue = false
            }

            const updatedToy = {
                [updatedName] : updatedValue
            }
            console.log('the toy', updatedToy)

            return {
                ...prevToy, ...updatedToy
            }
        })
        
    }
    const onSubmit = (e) => {
        e.preventDefault()
        createToy(pet.id, toy)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Oh yea!',
                    message: 'Great!',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'oh no!',
                    message: "Something went wrong",
                    variant: 'danger'
                })

            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <ToyForm 
                    toy={toy}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading={`Give ${pet.name} a toy!`}

                />
            </Modal.Body>
        </Modal>
    )
}

export default NewToyModal