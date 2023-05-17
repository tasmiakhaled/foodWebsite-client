import React, { useEffect, useRef } from "react";
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
import io from 'socket.io-client';


const auth = getAuth(app);

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [validated, setValidated] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [isUserNameTaken, setIsUserNameTaken] = useState(false);
  const [userNameError, setUserNameError] = useState('');

  const { createUser } = useContext(AuthContext);

  const socket = io('http://localhost:5000/');

  useEffect(() => {
    socket.on('userName-taken', () => {
      setIsUserNameTaken(true);
    });

    socket.on('userName-available', () => {
      setIsUserNameTaken(false);
    });

    return () => {
      socket.off('userName-taken');
      socket.off('userName-available')
    };
  }, []);

  const handleNameChange = (event) => {
    setUserName(event.target.value);

    socket.emit('check-userName', userName);
  };

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

    if (/^(?=.*?[#?!@$%^&*-]).{8,}/.test(password) === false) {
      setPasswordError('Password must be minimum eight in length and contain at least one special character');
    } else {
      setPasswordError('');
      return true;
    }
  }

  const handleFormSubmit = (event) => {

    event.preventDefault();
    setSuccess(false);

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    const userName = form.userName.value;
    const email = form.email.value;
    const password = form.password.value;
    const date = form.date.value;

    createUser(email, password, userName)
      .then(result => {
        const user = result.user;
        setUserName('');
        setEmail('');
        setPassword('');
        setSuccess(true);
        form.reset();
        verifiedEmail();
        updateUserName(userName);
      })
      .catch(error => {
        console.error(error);
      })

    fetch('http://localhost:5000/addUser', {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({ userName, email, date }),
    })
      .then(res => res.json())
      .then(success => {
        if (success) {
          alert('Successful');
        }
      })
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
                  <Form.Control type="text" name="userName" placeholder="User Name" value={userName} onChange={handleNameChange} required />
                  <Form.Control.Feedback type="invalid">
                    {userNameError && <p>{userNameError}</p>}
                  </Form.Control.Feedback>
                </Form.Group >
                <Form.Group className="form__group">
                  <Form.Control type="email" name="email" placeholder="Email" value={email} onChange={emailValidation} required />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                </Form.Group >
                <p className="text-danger">{emailMessage}</p>
                <Form.Group className="form__group">
                  <Form.Control type="password" name="password" placeholder="Password" value={password} onChange={handlePasswordBlur} required />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid password.
                  </Form.Control.Feedback>
                </Form.Group>
                <p className="text-danger">{passwordError}</p>
                <Form.Group className="form__group">
                  <Form.Control type="date" name="date" required />
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
    </Helmet>
  );
};

export default Register;