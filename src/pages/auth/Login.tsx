import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {Link} from 'react-router-dom'

import {Alert} from '~/core/components/alerts/Alert'
import {Button} from '~/core/components/buttons'
import {Card} from '~/core/components/containers'
import {HorizontalDivider} from '~/core/components/dividers'
import {PasswordInput, Input} from '~/core/components/Inputs'
import {GoogleButton} from '~/app/components/socialButton'
import {auth, useAuthentication} from '~/core/hooks/auth/Provider'

interface LoginTypes {
    email: string
    password: string
}

export const Login = () => {
    const {login, loggedOut} = useAuthentication()
    const [failed, setFailed] = useState<string | null>()
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<LoginTypes>()

    const handleLogin = (data: LoginTypes) => {
        setFailed(null)
        const {email, password} = data
        auth
            .login(email, password, true)
            .then((_response) =>  {
                if (_response.data.email) {
                    login(_response.data)
                }
            })
            .catch((error) => {
                setFailed(error.message)
            })
    }

    return (
        <main className='mx-auto w-full max-w-md p-6'>
            {failed && <Alert variant='danger'>{failed}</Alert>}
            {loggedOut && (
                <Alert variant='success'>
                    <span className='font-bold'>Goodbye!</span> Your session has been terminated.
                </Alert>
            )}

            <Card>
                <div className='p-4 sm:px-7 sm:py-8'>
                    <GoogleButton/>
                    <HorizontalDivider label='Or' className="text-center justify-center"/>

                    <form autoComplete='off' onSubmit={handleSubmit(handleLogin)}>
                        <div className='grid gap-y-4'>
                            <div>
                                <Input
                                  type="email" label="Email address"
                                  {...register("email", { required: true })}
                                  error={errors.email}                                />
                            </div>

                            <PasswordInput
                                label='Password'
                                disabled={isSubmitting}
                                {...register('password', {required: true})}
                                error={errors.password}
                                withResetLink
                            />
                        </div>
                        <div className='mt-6 grid w-full'>
                            <Button
                                type='submit'
                                variant='primary'
                                disabled={isSubmitting}
                                loading={isSubmitting}
                            >
                                Sign in
                            </Button>
                        </div>
                    </form>

                    <div className='mt-8 text-center'>
                        <p className='text-sm text-gray-600'>
                            <Link to='/' className='text-blue-600 decoration-2 hover:underline'>
                                &larr; Go back to homepage
                            </Link>
                        </p>
                    </div>
                </div>
            </Card>
        </main>
    )
}

export default Login
