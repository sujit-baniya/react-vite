import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {Link} from 'react-router-dom'

import {Alert} from '~/core/components/alerts/Alert'
import {Button} from '~/core/components/buttons'
import {Card} from '~/core/components/containers'
import {TextInput} from '~/core/components/Inputs'
import {auth} from '~/core/hooks/auth/Provider'

interface PasswordRecoveryTypes {
    email: string
}

export const Recovery = () => {
    const [success, setSuccess] = useState<string | null>()
    const [failed, setFailed] = useState<string | null>()

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<PasswordRecoveryTypes>()

    const handleRecoveryPassword = (data: PasswordRecoveryTypes) => {
        setFailed(null)
        setSuccess(null)
        auth
            .requestPasswordRecovery(data.email)
            .then(() => setSuccess('Password recovery request sent, check your email.'))
            .catch((error) => setFailed(`Failed to request password recovery: ${error.message}`))
    }

    return (
        <main className='mx-auto w-full max-w-md p-6'>
            {success && <Alert variant='success'>{success}</Alert>}
            {failed && <Alert variant='danger'>{failed}</Alert>}

            <Card>
                <div className='p-4 sm:px-7 sm:py-8'>
                    <form autoComplete='off' onSubmit={handleSubmit(handleRecoveryPassword)}>
                        <div className='grid gap-y-4'>
                            <div>
                                <TextInput
                                    label='Email address'
                                    placeholder='somebody@example.com'
                                    {...register('email', {required: true})}
                                    error={errors.email}
                                />
                            </div>
                        </div>
                        <div className='mt-6 grid w-full'>
                            <Button
                                type='submit'
                                variant='primary'
                                disabled={isSubmitting}
                                loading={isSubmitting}
                            >
                                Recover Password
                            </Button>
                        </div>
                    </form>

                    <div className='mt-8 text-center'>
                        <p className='text-sm text-gray-600'>
                            {'Remember your password? '}
                            <Link to='/login' className='text-blue-600 decoration-2 hover:underline'>
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>
            </Card>
        </main>
    )
}

export default Recovery