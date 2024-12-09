import React from 'react';
import CIconInput from '../../components/input/CIconInput';
import CButton from '../../components/button';
import { FaUserCircle, FaLock } from 'react-icons/fa';
import useLoginValidation from '../../hooks/login/useLoginForm';
import { IMG1, NBC } from '../../../public/img';
import { Link } from 'react-daisyui';


const LoginUser = () => {
  const { register, handleSubmit, errors, onSubmit, loading, error } = useLoginValidation();

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Login banner"
            src={IMG1}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <img src={NBC} alt="" className='w-24'/>
            <h1 className="mt-6 text-1xl font-bold text-gray-900 sm:text-2xl md:text-3xl dark:text-white">
              Welcome to Natural Beauty Center
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
              Please log in to access your account.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4 md:w-3/4">
              <div>
                <CIconInput
                  leftIcon={<FaUserCircle />}
                  label="Username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  register={register('username')}
                  errors={errors.username}
                />
              </div>
              <div>
                <CIconInput
                  leftIcon={<FaLock />}
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  register={register('password')}
                  errors={errors.password}
                />
              </div>
              
              <div>
                <CButton
                  type="submit"
                  label={loading ? 'Logging in...' : 'Login'}
                  variant="filled"
                  loading={loading}
                />
              </div>
              {error && <p className="text-red-500">{error.message || 'Login failed'}</p>}
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default LoginUser;
