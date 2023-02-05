import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { clsx } from 'clsx';
import { IFormLogin, useLogin } from '../../hooks/pages/useLogin';

const Login = (): ReactElement => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormLogin>();

  const {
    state: { handleSubmitForm },
  } = useLogin();

  return (
    <div className='flex justify-center items-center w-full h-screen bg-main-bg bg-cover bg-center bg-no-repeat'>
      <div className='flex justify-center items-center w-4/5 md:w-1/2 h-2/5 bg-white rounded-xl shadow-main-bg'>
        <form className='w-4/6' onSubmit={handleSubmit(handleSubmitForm)}>
          <div className='flex flex-col'>
            <label
              className='block w-28 font-[Montserrat] font-semibold	 text-lg'
              htmlFor='username'
            >
              User Name:
            </label>
            <input
              className={clsx(
                {
                  ['border-red-500 border-2']: errors.username,
                },
                'border rounded-lg p-2 outline-none mt-2'
              )}
              id='username'
              {...register('username', { required: true, maxLength: 20 })}
              // aria-invalid={errors.username ? 'true' : 'false'}
            />
          </div>

          <div className='mt-4 flex flex-col '>
            <label
              className='block w-28 font-[Montserrat] font-semibold text-lg'
              htmlFor='password'
            >
              Password:
            </label>
            <input
              type='password'
              className={clsx(
                {
                  ['border-red-500 border-2']: errors.password,
                },
                'border rounded-lg p-2 outline-none mt-2'
              )}
              id='password'
              {...register('password', { required: true })}
            />
          </div>

          <div className='flex flex-1 justify-center mt-6'>
            <input
              className='text-[18px] box-border rounded-xl bg-[#2198DD] cursor-pointer text-white p-3 w-40 m-auto transition duration-300 hover:-translate-y-1'
              type='submit'
              value='Login'
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
