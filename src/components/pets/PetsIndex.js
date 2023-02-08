import { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import { Spinner } from "react-bootstrap";
import LoadingScreen from "../shared/LoadingScreen";

// api func from api file
import { getAllPets } from "../../api/pets";

// need our messages from our autodissmissalert directory
import messages from "../shared/AutoDismissAlert/messages";

const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

// Pets index will make request to the api for all pets
// get response, display card for pet
const PetsIndex = (props) => {
    const [pets, setPets] = useState(null)
    const [error, setError] = useState(false)
    //pull msg alert
    const { msgAlert } = props

    // get pets from api when comp mounts
    useEffect(() => {
        getAllPets()
            .then(res => setPets(res.data.pets))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting pets',
                    message: 'Could not find any pets',
                    variant: 'danger'
                })
                setError(true)
            })
    }, [])

    //if error, display an error
    if (error) {
        return <LoadingScreen />
    } 
    // if no pet loaded yet, display loading
    if (!pets) { 
        return <LoadingScreen />
    } else if (pets.length === 0) {
        return <p>No pets yet, go add some!</p>
    }

    //otherwise if there are no pets , display that message

    //once we have array, loop over, produce 1 card for each pet
    const petCards = pets.map(pet => (
        <Card key={ pet.id } style={{ width: '30%', margin: 5 }}>
            <Card.Header>{ pet.fullTitle }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/pets/${pet.id}`} className="btn btn-info">View { pet.name }</Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))
    // return some jsx, container with all the pet cards
    return (
        <div className="container-md" style={ cardContainerStyle }>
            { petCards }
        </div>
    )

}

//export our component
export default PetsIndex