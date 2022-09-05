import { Landing, PassInput } from '../components/index';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

import { auth, provider, userscolectionRef } from '../lib/firebase';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { setDoc, doc } from 'firebase/firestore';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  function loginWithGoogle() {
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        const { uid, displayName, photoURL, email } = userCredential.user;
        const userInfo = {
          name: displayName ? displayName : email.split('@')[0],
          photoURL: photoURL ? photoURL : null,
          savedPins: [],
        };
        // persist user info to database
        setDoc(doc(userscolectionRef, uid), userInfo).then(() => {
          navigate('/', { replace: true });
        });
      })
      .catch((err) => console.log(err.code));
  }

  function changeHandler(e) {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function submitHandler(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then(() => navigate('/'))
      .catch((err) => console.log(err.code));
  }

  return (
    <>
      <Landing />

      <div className="absolute top-28 w-full flex justify-center">
        <div className="form-container">
          <h1 className="form-title">LogIn</h1>

          <button className="google-btn" onClick={loginWithGoogle}>
            <FcGoogle size={28} /> Signup With Google
          </button>

          <p className="advidor">or</p>

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
            <button className="form-btn">LogIn</button>
          </form>

          <Link
            to="/forget-password"
            className="tracking-wide text-lg hover:underline hover:text-sky-600"
          >
            Forget Password?
          </Link>

          <p className="tracking-wide text-left mt-4 text-lg">
            Need an Account?{' '}
            <Link
              to="/signup"
              className="font-semibold hover:underline hover:text-sky-600"
            >
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
