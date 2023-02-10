import { Card, Button } from 'react-bootstrap'
import { deleteToy } from '../../api/toys'
import EditToyModal from './EditToyModal'
import { useState } from 'react'


const ShowToy = (props) => {
    const { toy, user, pet, msgAlert, triggerRefresh } = props

    // here going to use react styling objects to our advantage
    // look at toy condition and change backgorund color
    const [editModalShow, setEditModalShow] = useState(false)

    const setBgCondition = (cond) => {
        if (cond === 'new') {
            return({width: '18rem', backgroundColor: '#b5ead7'})
        } else if (cond === 'used') {
            return({width: '18rem', backgroundColor: '#ffdac1'})
        } else {
            return({width: '18rem', backgroundColor: '#ff9aa2'})
        }
    }

    const destroyToy = () => {
        // this is the api call file function, distinguished from the other function in the route
        
        deleteToy(user, pet.id, toy._id)
        //upon success , want to send message then trigger refresh of parent component, if fails then send message
            .then(() => {
                msgAlert({
                    heading: 'Toy deleted',
                    message: 'Bye toy',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Uh oh',
                    message: 'Something went wrong',
                    variant: 'success'
                })
            })
    }
    return (
        <>
            <Card className='m-2' style={setBgCondition(toy.condition)}>
                <Card.Header style={{fontWeight:'bolder'}}>{toy.name}</Card.Header>
                <Card.Body>
                    <small>{toy.description}</small><br/>
                    <small>
                        {toy.isSqueaky ? 'squeak squeak' : 'stoic silence'}
                    </small>
                </Card.Body>
                <Card.Footer>
                    <small>
                    Condition: {toy.condition}
                    </small>
                    <br/>
                        
                    {
                        // or can add pet.owner &&  after user. 
                        user && user._id === pet.owner?._id
                        ?
                        <>
                            <Button
                                onClick={() => setEditModalShow(true)}
                                variant='warning'
                                className='m-2'
                            >
                                Edit Toy
                            </Button>
                            <Button 
                                onClick={() => destroyToy()} variant='danger'
                                className='mt-2'
                        >
                                Delete Toy
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
            <EditToyModal 
                user={user}
                pet={pet}
                toy={toy}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

export default ShowToy