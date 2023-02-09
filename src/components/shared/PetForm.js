// will take props. used to create AND update
// action dependent on the parent component
// form will look the same on both, create and update
//

import { Form, Button, Container } from 'react-bootstrap'

const PetForm = (props) => {
    const { pet, handleChange, handleSubmit, heading } = props
    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group 
                className='m-2'>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                        placeholder="What is your pet's name?"
                        name='name'
                        id='name'
                        value={ pet.name }
                        onChange={handleChange}
                    />

                </Form.Group>
                <Form.Group 
                className='m-2'>
                    <Form.Label>Type:</Form.Label>
                    <Form.Control
                        placeholder="What type of pet is this?"
                        name='type'
                        id='type'
                        value={ pet.type }
                        onChange={handleChange}
                    />

                </Form.Group>
                <Form.Group 
                className='m-2'>
                    <Form.Label>Age:</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="How old is your pet?"
                        name='age'
                        id='age'
                        value={ pet.age }
                        onChange={handleChange}
                    />

                </Form.Group>
                <Form.Group className='m-2'>
                <Form.Check 
                    label='is this pet adoptable?'
                    name="adoptable"
                    defaultChecked={ pet.adoptable }
                    onChange={handleChange}
                />
                </Form.Group>
                <Button className='m-2' type='submit'>Submit</Button>
            </Form>
        </Container>
    )
}

export default PetForm