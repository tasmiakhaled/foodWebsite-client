import React from 'react'

const CommentSection = () => {
  return (
    <div>
        <h4>Comments</h4>
    </div>
  )
}

export default CommentSection




//   return (
//     <Helmet title="Signup">
//       <CommonSection title="Signup" />
//       <section>
//         <Container>
//           <Row>
//             <Col lg="6" md="6" sm="12" className="m-auto">
//               <Form noValidate validated={validated} className="form mb-5" onSubmit={handleFormSubmit}>
//                 <Form.Group className="form__group">
//                   <Form.Control type="text" name= {userName} placeholder="User Name" onChange={handleNameChange} required />
//                   <Form.Control.Feedback type="invalid">
//                     {
//                       isUserNameTaken && <p>This username is taken.</p>
//                     }
//                   </Form.Control.Feedback>
//                 </Form.Group >
//                 <Form.Group className="form__group">
//                   <Form.Control type="email" name="email" placeholder="Email" onChange={emailValidation} required />
//                   <Form.Control.Feedback type="invalid">
//                     Please provide a valid email.
//                   </Form.Control.Feedback>
//                 </Form.Group >
//                 <p className="text-danger">{emailMessage}</p>
//                 <Form.Group className="form__group">
//                   <Form.Control type="password" name="password" placeholder="Password" onChange={handlePasswordBlur} required />
//                   <Form.Control.Feedback type="invalid">
//                     Please provide a valid password.
//                   </Form.Control.Feedback>
//                 </Form.Group>
//                 <p className="text-danger">{passwordError}</p>
//                 <Form.Group className="form__group">
//                   <Form.Control type="date" name="date" required />
//                   <Form.Control.Feedback type="invalid">
//                     Please provide your birth date.
//                   </Form.Control.Feedback>
//                 </Form.Group>
//                 <Button type="submit" style={addTOCart__btn}>
//                   Sign Up
//                 </Button>
//                 {success && <p className="text-success text-center mt-3 fw-bold">Successfully Registered!</p>}
//               </Form>
//               <p className="text-center">Already have an account? <Link to="/login">Login</Link></p>
//             </Col>
//           </Row>
//         </Container>
//       </section>
//     </Helmet >
//   );
// };

// export default Register;
