import { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEffect } from 'react'

const schema = yup
  .object({
    firstName: yup
      .string()
      .required('FirstName is Required')
      .min(3, 'FirstName must be 3 or more in length '),
    lastName: yup
      .string()
      .required('LastName is Required')
      .min(3, 'LastName must be 3 or more in length '),
    email: yup
      .string()
      .required('email is Required')
      .email('Must be a valid email'),
    profession: yup
      .string()
      .required('Profession is Required')
      .min(3, 'Profession must be 3 or more in length '),
    bio: yup
      .string()
      .required('Bio is Required')
      .min(10, 'Bio must be 10 or more in length ')
      .max(300, 'Bio must be equal or less thant 300 character'),
    gender: yup
      .mixed()
      .required('Gender is required')
      .oneOf(['male', 'female']),
  })
  .required()

function AddContact({ addContact }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  })

  console.log(errors)
  const [birthYear, setBirthYear] = useState(new Date())

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstName: '',
        lastName: '',
        email: '',
        profession: '',
        bio: '',
        gender: 'male',
        image: '',
      })
    }
  }, [isSubmitSuccessful])

  useEffect(() => {
    setValue('dateOfBirth', birthYear)
  }, [birthYear])

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <>
      <h2 className='text-center'>Add Contact</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group as={Row} className='mb-3'>
          <Col sm={3}>
            <Form.Label htmlFor='firstName' column>
              First Name
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              type='text'
              id='firstName'
              defaultValue=''
              {...register('firstName')}
              isInvalid={errors?.firstName}
              placeholder='Enter Your First Name'
            />
            <Form.Control.Feedback type='invalid' className='d-block'>
              {errors?.firstName?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Col sm={3}>
            <Form.Label htmlFor='lastName' column>
              Last Name
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              type='text'
              id='lastName'
              name='lastName'
              defaultValue=''
              {...register('lastName')}
              isInvalid={errors?.lastName}
              placeholder='Enter Your Last Name'
            />
            <Form.Control.Feedback type='invalid' className='d-block'>
              {errors?.lastName?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Col sm={3}>
            <Form.Label htmlFor='email' column>
              Email
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              type='email'
              id='email'
              name='email'
              defaultValue=''
              {...register('email')}
              isInvalid={errors?.email}
              placeholder='Enter Your Email'
            />
            <Form.Control.Feedback type='invalid' className='d-block'>
              {errors?.email?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Col sm={3}>
            <Form.Label htmlFor='profession' column>
              Profession
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              type='profession'
              id='profession'
              name='profession'
              defaultValue=''
              {...register('profession')}
              isInvalid={errors?.profession}
              placeholder='Enter Your Profession'
            />
            <Form.Control.Feedback type='invalid' className='d-block'>
              {errors?.profession?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Col sm={3}>
            <Form.Label htmlFor='image' column>
              Profile Picture
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              type='text'
              id='image'
              name='image'
              defaultValue=''
              {...register('image')}
              isInvalid={errors?.image}
              placeholder='Enter Your profile picture Url'
            />
            <Form.Control.Feedback type='invalid' className='d-block'>
              {errors?.image?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Col sm={3}>
            <Form.Label htmlFor='dateOfBirth' column>
              Date of Birth
            </Form.Label>
          </Col>
          <Col sm={9}>
            <DatePicker
              selected={birthYear}
              name='dateOfBirth'
              id='dateOfBirth'
              placeholder='Enter your Date of Birth'
              maxDate={new Date()}
              showYearDropdown
              onChange={(date) => setBirthYear(date)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Col sm={3}>
            <Form.Label htmlFor='gender' column>
              Gender{' '}
            </Form.Label>
          </Col>
          <Col xs='auto'>
            <Form.Check
              type='radio'
              label='Male'
              value='male'
              defaultChecked={true}
              {...register('gender')}
            />
          </Col>
          <Col xs='auto'>
            <Form.Check
              type='radio'
              label='Female'
              value='female'
              {...register('gender')}
            />
          </Col>
          <Form.Control.Feedback type='invalid' className='d-block'>
            {errors?.gender?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Col sm={3}>
            <Form.Label htmlFor='firstName' column>
              Bio
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              as='textarea'
              type='text'
              defaultValue=''
              {...register('bio')}
              isInvalid={errors?.bio}
              placeholder='Enter Your Bio'
            />
            <Form.Control.Feedback type='invalid' className='d-block'>
              {errors?.bio?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Button
          variant='primary'
          size='md'
          type='submit'
          disabled={isSubmitting ? 'disabled' : ''}
        >
          Add Contact
        </Button>
      </Form>
    </>
  )
}

export default AddContact
