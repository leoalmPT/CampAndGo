import React from "react";
import {Card, Container, Form, Row, Col} from 'react-bootstrap';
import '../App.css';
import ExitModal from '../components/ExitModal.jsx'
 
function Request() {
    const genders = [ "Male", "Female", "Other"];
    const [item, setItem] = React.useState({ state: ""});
    const [modalShow, setModalShow] = React.useState(false);
    const [redirect, setRedirect] = React.useState("");

    const { state } = item;
    
    const handleChange = e => {
      e.persist();
      setItem(prevState => ({
        ...prevState,
        state: e.target.value
      }));
    };

    function handleSubmit(e) {
        e.preventDefault();
        setModalShow(true);
        setRedirect(e.target.getAttribute('link'));
        // setTimeout(() => {
        //     if (modalShow === true) {
        //         window.location.href=e.target.getAttribute('link');
        //     }
        // }, 2500);
    }

    return (  
        <>
            <Container>
                <h1 style={{marginTop: 30, marginBottom: 30}}>Request</h1>
                <Form>
                    <h4>Personal information</h4>
                    <p>Complete the following form, in order to proceed with request.</p>
                    <Card style={{marginBottom: 30}}>
                        <Card.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Row>
                                    <Col lg={6}>
                                        <Form.Control controlId="FirstName" type="text" placeholder="First Name" />
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Control controlId="LastName" type="text" placeholder="Last Name" />
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Gender">
                                <Form.Label>Gender</Form.Label>
                                {genders.map(gender => (
                                    <Form.Check 
                                        value={gender}
                                        type="radio"
                                        label={gender}
                                        onChange={handleChange}
                                        checked={state === gender}
                                    />
                                ))}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Phone">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control type="text" placeholder="(+351) XXX XXX XXX" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="BasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="yourEmail@service.com" />
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                        </Card.Body>
                    </Card>
                    <Card style={{marginBottom: 30}}>
                        <Card.Body>
                            <h4 style={{marginBottom: 30, textAlign: "center", fontWeight: "bold"}}>Choose your payment method</h4>
                            <Row>
                                <Col lg={2}></Col>
                                <Col lg={8}>
                                    <Row>
                                        <Col lg={4}>
                                            <h4 style={{textAlign: "center"}}>MB Way</h4>
                                            <button className="PayMethodBtn" onClick={handleSubmit}>
                                                <img style={{width: "70%", height: "80%"}} link="https://www.mbway.pt/" src={"https://cdn.discordapp.com/attachments/951420985385553971/980110309383614515/mbway_logo.png"} alt="" />
                                            </button>
                                        </Col>
                                        <Col lg={4}>
                                            <h4 style={{textAlign: "center"}}>Paypal</h4>
                                            <button className="PayMethodBtn" onClick={handleSubmit}>
                                                <img style={{width: "70%", height: "80%"}} link="https://www.paypal.com/pt/home" src={"https://cdn.discordapp.com/attachments/951420985385553971/980110308842557470/paypal_logo.png"} alt="" />
                                            </button>
                                        </Col>
                                        <Col lg={4}>
                                            <h4 style={{textAlign: "center"}}>Multibanco</h4>
                                            <button className="PayMethodBtn" onClick={handleSubmit}>
                                                <img style={{width: "70%", height: "80%"}} link="https://www.multibanco.pt/" src={"https://cdn.discordapp.com/attachments/951420985385553971/980110309115174952/multibanco_logo.png"} alt="" />
                                            </button>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={2}></Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Form>
                <ExitModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        linkPay={redirect}
                />
            </Container>
        </>
        );
}

export default Request;