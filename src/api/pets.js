// pets resource lives here
import apiUrl from '../apiConfig'
import axios from 'axios'


// READ -- index
export const getAllPets = () => {
    return axios(`${apiUrl}/pets`)
}

// READ -- show
export const getOnePet = (id) => {
    return axios(`${apiUrl}/pets/${id}`)
}


// CREATE -- create a pet


// UPDATE -- update a pet


// DELETE -- delete a pet