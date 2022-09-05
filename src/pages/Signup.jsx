import { Landing, PassInput } from '../components/index';
import { Link, useNavigate } from 'react-router-dom';

import { useState } from 'react';
import { auth, userscolectionRef } from '../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPass: '',
  });
  const navigate = useNavigate();

  function changeHandler(e) {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function submitHandler(e) {
    e.preventDefault();
    if (formData.password !== formData.confirmPass)
      console.log('Password do not match');

    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        const { uid, displayName, photoURL, email } = userCredential.user;
        const userInfo = {
          name: displayName ? displayName : email.split('@')[0],
          photoURL: photoURL ? photoURL : null,
          savedPins: [],
        };
        setDoc(doc(userscolectionRef, uid), userInfo).then(() => {
          navigate('/', { replace: true });
        });
      })
      .catch((err) => console.log(err.code));
  }

  return (
    <>
      <Landing />

      <div className="absolute top-28 w-full flex justify-center ">
        <div className="form-container">
          <h1 className="form-title">SignUp</h1>

          <form onSubmit={submitHandler}>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={formData.email}
              onChange={changeHandler}
              className="glass-input"
            />
            <PassInput
              password={formData.password}
              changeHandler={changeHandler}
            />
            <PassInput
              password={formData.confirmPass}
              changeHandler={changeHandler}
              name="confirmPass"
              placeholder="Confirm Password"
            />
            <button className="form-btn">SignUp</button>
          </form>

          <p className="tracking-wide text-left mt-6 text-lg">
            Already have an Account?{' '}
            <Link
              to="/login"
              className="font-semibold hover:underline hover:text-sky-600"
            >
              signIn
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
