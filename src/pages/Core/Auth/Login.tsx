import { Anchor, Button, Divider, Loader, Paper, PasswordInput, px, rem, Stack, Text, TextInput, Title } from '@mantine/core'
import classes from '../../../components/css/Login.module.css'
import { Link, useNavigate } from 'react-router'
import { Controller, useForm } from 'react-hook-form'
import { AccountLogin } from '../../../ServerTypes/Account'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import useLogin from '../../../fetchHooks/mutation/auth/useLogin'
import { decodeToken } from "react-jwt";
import { ReturnAccountRegistration, setAccountInformation } from '../../../reduxFeature/accountSlice'
import { useAppDispatch } from '../../../hooks/reduxHooks'

const schema = yup.object({
    username: yup.string().required("username is required"),
    password: yup.string().required('password is required'),
})

export const Login = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { handleSubmit, control, formState: { errors } } = useForm<AccountLogin>({
        defaultValues: {
            username: '',
            password: '',
        },
        resolver: yupResolver(schema)
    })

    const mutationLogin = useLogin()

    const OnSubmitData = async (data: AccountLogin) => {
        const response = await mutationLogin.mutateAsync({
            username: data.username,
            password: data.password
        })

        if (response) {
            new Promise<void>((resolve, reject) => {
                try {
                    const token = decodeToken(response) as Record<"sub", ReturnAccountRegistration>
                    dispatch(setAccountInformation(token.sub))
                    localStorage.setItem("_auth_token", response)
                    resolve()
                } catch (error) {
                    reject(error)
                }
            }).then(() => {
                navigate("/")
            })
        }

    }

    return <>
        <div className={classes.wrapper}>
            <Paper p="md" bg="transparent" h={rem("100vh")}>
                <Paper h={rem('100%')} className={classes.form} radius="md" p={30}>
                    <Stack mb={px(50)} mt="xl">
                        <Title order={2} lh={0.5} className={classes.title} ta="center" mt="md">
                            Welcome back to InfraTrack!
                        </Title>
                        <Text c="dimmed" size="sm" fw={600} lts={0.5} lh={0.9} ta="center">
                            An advance Web Software for managing and monitoring infrastructure project.
                        </Text>
                    </Stack>
                    <form onSubmit={handleSubmit(OnSubmitData)}>
                        <Controller 
                            control={control}
                            name='username'
                            render={({field}) => <TextInput 
                                label="Username" 
                                placeholder="Enter your username" 
                                size="md" 
                                error={errors.username?.message}
                                {...field}
                            />} 
                        />
                        <Controller 
                            control={control}
                            name='password'
                            render={({field}) => <PasswordInput 
                                label="Password" 
                                placeholder="Enter your password" 
                                mt="md" 
                                size="md" 
                                error={errors.password?.message}
                                {...field}
                            />}
                        />
                        <Button leftSection={mutationLogin.isPending ? <Loader size={18} /> : null} disabled={mutationLogin.isPending} type='submit' fullWidth mt="xl" size="md">
                            Login
                        </Button>
                    </form>
                    <Divider my="lg" />
                    <Text ta="center">
                        Don&apos;t have an account?{' '}
                        <Anchor<typeof Link> component={Link} fw={700} to={'/register'} viewTransition>
                            Register
                        </Anchor>
                    </Text>
                </Paper>
            </Paper>
        </div>
    </>
}