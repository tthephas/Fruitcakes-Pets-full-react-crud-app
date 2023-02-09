import { useState } from "react"
import { createPet } from "../../api/pets"
import { createPetSuccess, createPetFailure } from "../shared/AutoDismissAlert/messages"
import PetForm from "../shared/PetForm"
import { useNavigate } from "react-router-dom"

// create pet needs to 
// render a form
// built a pet object in state
// the form should make an axios post request when submitted
// send alert upon success or failure
// on success :then should redirect our user to new pet show page
// on fail :component shoudl send the fail message and remain visible


const CreatePet = (props) => {
    // pull out our props
    const { user, msgAlert } = props

    // pull our nav func from use navigate
    const navigate = useNavigate()
    console.log('this is navigate', navigate)

    const [pet, setPet] = useState({
        name: '',
        type: '',
        age: '',
        adoptable: false
    })

    const onChange = (e) => {
        e.persist()

        setPet(prevPet => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            //handle check box
            if (updatedName === 'adoptable' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'adoptable' && !e.target.checked) {
                updatedValue = false
            }

            const updatedPet = {
                [updatedName] : updatedValue
            }
            console.log('the pet', updatedPet)

            return {
                ...prevPet, ...updatedPet
            }
        })
        
    }

    const onSubmit = (e) => {
        e.preventDefault()
        
        createPet(user, pet)
            .then(res => { navigate(`/pets/${ res.data.pet.id }`)})
            .then(() => {
                msgAlert({
                    heading: 'Oh yea!',
                    message: createPetSuccess,
                    variant: 'success'
                })
            })
            .catch(() => {
                msgAlert({
                    heading: 'oh no!',
                    message: createPetFailure,
                    variant: 'danger'
                })

            })
    }

    return (
    <PetForm 
        pet={pet}
        handleChange={onChange}
        handleSubmit={onSubmit}
        heading="Add a new pet!"
    />
    )
}

export default CreatePet