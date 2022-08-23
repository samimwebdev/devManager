import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Form, Button } from 'react-bootstrap'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import FormTextInput from '../layouts/FormTextInput'
import { AuthContext } from '../context/Auth.Context'

const schema = yup.object({
  email: yup.string().required('Email is Required'),
  password: yup.string().required('password is required'),
})

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    isSubmitting,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const { login } = useContext(AuthContext)

  const onSubmit = (data) => {
    console.log(data)
    //registering user
    login({
      identifier: data.email,
      password: data.password,
    })
  }

  return (
    <>
      <h2 className='text-center mb-3'>Register</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormTextInput
          name='email'
          label='Email'
          placeholder='Enter Your Email'
          errors={errors}
          register={register}
          defaultValue='samimfazlu091@gmail.com'
        />
        <FormTextInput
          name='password'
          label='password'
          placeholder='Enter password'
          errors={errors}
          register={register}
          type='password'
          defaultValue='abcdeFf1@'
        />

        <Button
          variant='primary'
          size='md'
          type='submit'
          disabled={isSubmitting ? 'disabled' : ''}
          className='text-center d-inline-block w-auto'
        >
          Login
        </Button>
      </Form>
    </>
  )
}

export default Login
