import React, { FormEvent } from 'react'
import { loginAsync } from '../app/authSlice';
import { useAppDispatch } from '../app/hooks';

const AuthPage = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    dispatch(
      loginAsync({
        email: formData.get('email') as string,
        password: formData.get('password') as string
      })
    );
  }

  return (
    <div>
      <form onSubmit={e => handleSubmit(e)}>
        <input type='email' name='email' />
        <input type='password' name='password' />
        <button>Login</button>
      </form>
    </div>
  )
}

export default AuthPage