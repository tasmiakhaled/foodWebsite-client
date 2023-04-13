import React, { useRef } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from "../firebase.init";
import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import '../styles/product-details.css';
import { useContext } from "react";
import { AuthContext } from "../contexts/UserContext";


const auth = getAuth(app);

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [validated, setValidated] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const { createUser } = useContext(AuthContext);

  const handleNameBlur = event => {
    setName(event.target.value);
  }

  const emailValidation = event => {
    setEmail(event.target.value);

    if (/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email) === false) {
      setEmailMessage('The email is not valid.');
    } else {
      setEmailMessage('');
      return true;
    }
  }

  const handlePasswordBlur = event => {
    setPassword(event.target.value);

    if (/(?=.*?[#?!@$%^&*-])/.test(password) === false) {
      setPasswordError('Password must be minimum eight in length and contain at least one special character');
    } else {
      setPasswordError('');
      return true;
    }
  }

  const handleFormSubmit = (event) => {

    event.preventDefault();
    setSuccess(false);

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, email, password);

    createUser(email, password, name)
      .then(result => {
        const user = result.user;
        console.log('registered user', user);
        setName('');
        setEmail('');
        setPassword('');
        setSuccess(true);
        form.reset();
        verifiedEmail();
        updateUserName(name);
      })
      .catch(error => {
        console.error(error);
      })

    if (form.checkValidity() === false) {
      event.stopPropagation();
      // return;
    }

    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setPasswordError('Password must be minimum eight in length and contain at least one special character');
      return;
    }

    setValidated(true);
    event.preventDefault();
  };

  const verifiedEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        alert('Please check your email to verify your email address.');
      })
  }

  const updateUserName = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name
    })
      .then(() => {
        console.log('display name updated');
      })
      .catch(error => {
        console.error(error);
      })
  }

  const addTOCart__btn = {
    border: "none",
    padding: "7px 25px",
    background: "#df2020",
    color: "#fff",
    borderRadius: "5px",
    fontSize: "0.9rem",
    marginLeft: "30%"
  };

  return (
    <Helmet title="Signup">
      <CommonSection title="Signup" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto">
              <Form noValidate validated={validated} className="form mb-5" onSubmit={handleFormSubmit}>
                <Form.Group className="form__group">
                  <Form.Control type="text" name="name" placeholder="Full Name" onBlur={handleNameBlur} required />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid name.
                  </Form.Control.Feedback>
                </Form.Group >
                <Form.Group className="form__group">
                  <Form.Control type="email" name="email" placeholder="Email" onChange={emailValidation} required />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                </Form.Group >
                <p className="text-danger">{emailMessage}</p>
                <Form.Group className="form__group">
                  <Form.Control type="password" name="password" placeholder="Password" onChange={handlePasswordBlur} required />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid password.
                  </Form.Control.Feedback>
                </Form.Group>
                <p className="text-danger">{passwordError}</p>
                <Form.Group className="form__group">
                  <Form.Control type="date" required />
                  <Form.Control.Feedback type="invalid">
                    Please provide your birth date.
                  </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" style={addTOCart__btn}>
                  Sign Up
                </Button>
                {success && <p className="text-success text-center mt-3 fw-bold">Successfully Registered!</p>}
              </Form>
              <p className="text-center">Already have an account? <Link to="/login">Login</Link></p>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet >
  );
};

export default Register;
