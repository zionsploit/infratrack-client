
import { Anchor, Button, Divider, Flex, Loader, Paper, PasswordInput, px, rem, Stack, Text, TextInput, Title } from '@mantine/core'
import classes from '../../../components/css/Register.module.css'
import { Link } from 'react-router'
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import useRegister from '../../../fetchHooks/mutation/auth/useRegister';
import { AccountRegistration } from '../../../ServerTypes/Account';

const schema = yup.object({
    firstname: yup.string().required("firstname is required"),
    middlename: yup.string().required("middlename is required"),
    lastname: yup.string().required("lastname is required"),
    username: yup.string().required("username is required"),
    password: yup.string().required("password is required"),
    confirmpassword: yup.string().required("confirm-password is required").oneOf([yup.ref('password')], 'Passwords must match')
})

export const Register = () => {
    const { handleSubmit, control, formState: {errors} } = useForm<AccountRegistration>({
        defaultValues: {
            firstname: '',
            middlename: '',
            lastname: '',
            username: '',
            password: '',
            confirmpassword: ''
        },
        resolver: yupResolver(schema)
    })

    const mutationRegister = useRegister()

    const OnSubmitData = async (data: AccountRegistration) => {
        await mutationRegister.mutateAsync({
            firstname: data.firstname,
            middlename: data.middlename,
            lastname: data.lastname,
            username: data.username,
            password: data.password,
            confirmpassword: data.confirmpassword
        })
    }

    return <>
        <div className={classes.wrapper}>
            <Flex justify="center" align="center">
                <Paper p="xl" bg="transparent" h={rem("100vh")} w={rem("80vw")}>
                    <Flex align='self-start' h={rem("100%")} w={rem("100%")}>
                        <Paper radius={0} h={rem('100%')} w={rem("50%")} className={classes.form} p={30}>
                            <Paper px="xl">
                                <Stack mb={px(50)}>
                                    <Title order={2} lh={0.5} className={classes.title} ta="center">
                                        Create Your Account
                                    </Title>
                                    <Text c="dimmed" size="sm" fw={600} lts={0.5} lh={0.9} ta="center">
                                        Welcome back! Please enter your details.
                                    </Text>
                                </Stack>
                                <form onSubmit={handleSubmit(OnSubmitData)}>
                                    <Stack gap="xs">
                                        <Divider label="Account Information" labelPosition="left" />
                                        <Controller
                                            control={control}
                                            name='firstname'
                                            render={({ field }) => <TextInput 
                                                label="First Name" 
                                                placeholder="Enter your firstname" 
                                                size="xs" 
                                                error={errors.firstname?.message}
                                                {...field}

                                            />
                                        }/>
                                        <Controller 
                                            control={control}
                                            name='middlename'
                                            render={({field}) => <TextInput 
                                                label="Middle Name" 
                                                placeholder="Enter your middlename" 
                                                size="xs"
                                                error={errors.middlename?.message}
                                                {...field} 
                                            />
                                        }/>
                                        <Controller
                                            control={control}
                                            name='lastname'
                                            render={({field}) => <TextInput 
                                                label="Last Name" 
                                                placeholder="Enter your lastname" 
                                                size="xs" 
                                                error={errors.lastname?.message}
                                                {...field}
                                            />
                                        }/>
                                        <Divider label="Account Credentials" labelPosition="left" />
                                        <Controller 
                                            control={control}
                                            name='username'
                                            render={({field}) => <TextInput 
                                                label="Username" 
                                                placeholder="Enter your username" 
                                                size="xs" 
                                                error={errors.username?.message}
                                                {...field}
                                            />
                                        }/>
                                        <Controller 
                                            control={control}
                                            name='password'
                                            render={({field}) => <PasswordInput 
                                                label="Password" 
                                                placeholder="Enter your password" 
                                                size="xs" 
                                                error={errors.password?.message}
                                                {...field}
                                            />}
                                        />
                                        <Controller 
                                            control={control}
                                            name='confirmpassword'
                                            render={({field}) => <PasswordInput 
                                                label="Confirm Password" 
                                                placeholder="Enter your confirm password" 
                                                size="xs" 
                                                error={errors.confirmpassword?.message}
                                                {...field}
                                            />}
                                        />
                                    </Stack>
                                    <Button 
                                        leftSection={mutationRegister.isPending ? <Loader color='blue' size="xs" /> : null} 
                                        disabled={mutationRegister.isPending} 
                                        type='submit' fullWidth mt="xl" size="xs"
                                    >
                                        Register
                                    </Button>
                                </form>
                                <Divider my="lg" />
                                <Text ta="center">
                                    Already have an account?{' '}
                                    <Anchor<typeof Link> component={Link} fw={700} to={'/login'} viewTransition>
                                        Login
                                    </Anchor>
                                </Text>
                            </Paper>
                        </Paper>
                        <Paper p={0} radius={0} h={rem('100%')} w={rem("50%")} className={classes.right_content_wrapper} >
                            <Stack gap="xl" p="xl" bg="rgba(0, 0, 0, 0.879)" h={rem("100%")} >
                                <Text mt="xl" lh={1} ta="center" fz={px(40)} c="white" fw="bolder">
                                    Welcome To Infratrack! Join Now for easy tracking and management of your infrastructure projects.
                                </Text>
                                <Text c="white" ta="center">
                                    Your solution for seamless infrastructure management.  Register now and unlock a suite of powerful features designed to improve project outcomes.  Benefit from real-time tracking, automated reporting, and enhanced collaboration. Our system empowers you to make data-driven decisions, optimize resource allocation, and minimize risks.  Join us today and take control of your infrastructure projects.
                                </Text>
                                {/* Under Development, the Idea Behind here is a carousel and an overview of dashboard */}
                            </Stack>
                        </Paper>
                    </Flex>
                </Paper>
            </Flex>
        </div>
    </>
}