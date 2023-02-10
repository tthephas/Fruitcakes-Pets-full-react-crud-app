import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button } from 'react-bootstrap'
import { getOnePet, removePet, updatePet } from "../../api/pets";
import messages from "../shared/AutoDismissAlert/messages";
//import LoadingScreen from "../shared/LoadingScreen";
import EditPetModal from "./EditPetModal";
import ShowToy from "../toys/ShowToy";
import NewToyModal from "../toys/NewToyModal";

const toyCardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}
// we need to get the pet's id from the route parameter then make a request to the api when we retrieve a pet from the api and then we'll render the data on the screen

const ShowPet = (props) => {
    const [pet, setPet] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [toyModalShow, setToyModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()

    const { user, msgAlert } = props
    console.log('user in showPet props', user)
    console.log('msgAlert in showPet props', msgAlert)

    useEffect(() => {
        getOnePet(id)
            .then(res => setPet(res.data.pet))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting pets',
                    message: 'Could not find any pets',
                    variant: 'danger'
                })
             
            })
    }, [updated])

    // here is where our remove pet func will get called
    const setPetFree = () => {
        removePet(user, pet.id)
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removePetSuccess,
                    variant: 'success'
                })
            })
            .then(() => {navigate('/')})
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: messages.removePetFailure,
                    variant: 'danger'
                })
            })
    }

    let toyCards
    if(pet) {
        if (pet.toys.length > 0) {
            toyCards = pet.toys.map(toy => (
                <ShowToy 
                    key={toy.id}
                    toy={toy}
                    user={user}
                    pet={pet}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        }
    }

    if(!pet) {
        return <p>loading.....</p>
    }
    return (
        <>
            <Container >
                <Card className="mt-3" style={{width:'350px'}}>
                    <Card.Header style={{fontWeight:'bolder'}}>{ pet.fullTitle }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div>
                                <small>
                                    Age: { pet.age }
                                </small>
                            </div>
                            <div>
                                <small>
                                    Type: { pet.type }
                                </small>
                            </div>
                            <div>
                                <small>
                                    Adoptable: { pet.adoptable ? 'yes' : 'no' }
                                </small>
                            </div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button 
                            className="m-2" 
                            variant='info'
                            onClick={() => setToyModalShow(true)}>
                            Give {pet.name} a toy!
                        </Button>
                        {
                            pet.owner && user && pet.owner._id === user._id
                            ?
                            <>
                                <Button 
                                    className="m-2" 
                                    variant='warning'
                                    onClick={() => setEditModalShow(true)}
                                >
                                    Edit {pet.name}
                                </Button>
                                <Button className="m-2" variant='danger'
                                onClick={() => setPetFree()}
                                >
                                    Set {pet.name} Free
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <Container className="m-2" style={toyCardContainerLayout}>
                {toyCards}
            </Container>
            <EditPetModal
                user={user}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                updatePet={updatePet}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                pet={pet}
            />
            <NewToyModal 
                user={user}
                pet={pet}
                show={toyModalShow}
                handleClose={() => setToyModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
        </>
    )
}

export default ShowPet