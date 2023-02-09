// pets resource lives here
import apiUrl from '../apiConfig'
import axios from 'axios'

// THESE ARE API FUNCTIONS. NOT ROUTES. API FUNCTIONS. FUNCTIONS THAT MAKE CALLS TO API'S


// READ -- index
export const getAllPets = () => {
    return axios(`${apiUrl}/pets`)
}

// READ -- show
export const getOnePet = (id) => {
    return axios(`${apiUrl}/pets/${id}`)
}


// CREATE -- create a pet
export const createPet = (user, newPet) => {
    console.log('this is the user', user)
    console.log('this is the new pet', newPet)
    return axios({
        url: `${apiUrl}/pets`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { pet: newPet }
    })
}


// UPDATE -- update a pet
export const updatePet = (user, updatedPet) => {

    return axios({
        url: `${apiUrl}/pets/${updatedPet.id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { pet: updatedPet }
    })
}


// DELETE -- delete a pet
export const removePet = (user, petId) => {

    return axios({
        url: `${apiUrl}/pets/${petId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}
