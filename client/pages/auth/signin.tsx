import Router from "next/router";
import React, { SyntheticEvent, useState } from "react";
import useRequest from "../../hooks/useRequest";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [requestFn, errorsArr] = useRequest({
    url: "/api/users/signin",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => {
      Router.push("/");
    },
  });

  const submitHandler = async (event: SyntheticEvent) => {
    event.preventDefault();
    requestFn();
  };
  return (
    <form onSubmit={submitHandler}>
      <h1>Sign In</h1>
      <div className='form-group'>
        <label htmlFor='email'>Email</label>
        <input value={email} type='email' className='form-control' onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className='form-group'>
        <label htmlFor='password'>Password</label>
        <input
          value={password}
          type='password'
          className='form-control'
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errorsArr.length > 0 && (
        <div className='alert alert-danger'>
          <ul className='my-0'>
            {errorsArr.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      )}
      <button className='btn btn-primary'>Sign In</button>
    </form>
  );
};

export default Signup;
