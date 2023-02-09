import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
// /TOYS / PETID 
export const createToy = (petId, newToy) => {

    return axios({
        url: `${apiUrl}/toys/${petId}`,
        method: 'POST',
        data: { toy: newToy }
    })
}

// UPDATE
// /TOYS / PETID / TOY ID
export const updateToy = (user, petId, updatedToy) => {

    return axios({
        url: `${apiUrl}/toys/${petId}/${updatedToy.id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { toy: updatedToy }
    })
}


// DELETE
// /TOYS / PETID / TOY ID
export const deleteToy = (user, petId, toyId) => {

    return axios({
        url: `${apiUrl}/toys/${petId}/${toyId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}
