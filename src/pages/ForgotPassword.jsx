import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Form, Button } from 'react-bootstrap'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import FormTextInput from '../layouts/FormTextInput'
import { AuthContext } from '../context/Auth.Context'
import { axiosPublicInstance } from '../config/axios'
import { toast } from 'react-toastify'

const schema = yup.object({
  email: yup.string().email().required('Email is Required'),
})
function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    isSubmitting,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    try {
      const response = await axiosPublicInstance.post(
        '/auth/forgot-password/',
        {
          email: data.email,
        }
      )
      console.log(response.data)
      toast.success('Email is sent successfully with password reset link')
    } catch (err) {
      console.log(err.response)
      toast.success('Error in sending email')
    }
  }

  return (
    <>
      <h2 className='text-center mb-3'>Forgot Password ?</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormTextInput
          name='email'
          label='Email'
          placeholder='Enter Your Email'
          errors={errors}
          register={register}
          defaultValue='samimfazlu091@gmail.com'
        />
        <Button
          variant='primary'
          size='md'
          type='submit'
          disabled={isSubmitting ? 'disabled' : ''}
          className='text-center d-inline-block w-auto'
        >
          Submit
        </Button>
      </Form>
    </>
  )
}

export default ForgotPassword
