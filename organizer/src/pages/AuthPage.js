import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useEffect, useState} from "react";
import {createAction_setAppBarLinks, createAction_setUserStatus} from "../store/actionCreators/AppActionCreators";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router";

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                Studying Organizer by А.С.О.И.У
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignIn() {

    const [access, setAccess] = useState(localStorage.getItem('accessToken'))
    const [refresh, setRefresh] = useState(localStorage.getItem('refreshToken'))
    const [refreshRequired, setRefreshRequired] = useState(false)
    const [loading, setLoading] = useState()
    const [formUsername, setFormUsername] = useState()
    const [formPassword, setFormPassword] = useState()
    const [ firstName, setFirstName] = useState('')
    const [ lastName, setLastName] = useState('')
    const [ username, setUsername] = useState('')
    const [ email, setEmail] = useState('')
    const [ dateJoined, setDateJoined] = useState('')
    const [ error, setError] = useState()
    const csrftoken = getCookie('csrftoken')

    const dispatch = useDispatch()

    const submitHandler = e => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        setLoading(true);
        fetch(
            'http://192.168.184.184:8000/api/token/obtain',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({
                    username: data.get('email'),
                    password: data.get('password'),
                })
            }
        )
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw Error(`Something went wrong: code ${response.status}`)
                }
            })
            .then(({access, refresh}) => {
                localStorage.setItem('accessToken', access)
                setAccess(access)
                localStorage.setItem('refreshToken', refresh)
                setRefresh(refresh)
                setError(null)
                setError(null)
            })
            .catch(error => {
                console.log(error)

                setError('Ошибка, подробности в консоли')
            })
            .finally(setLoading(false))
    }
    console.log(access)

    const history = useHistory()


    useEffect(() => {
        if (access) {
            fetch(
                'http://192.168.184.184:8000/api/user',
                {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Authorization': `Bearer ${access}`,
                    },
                }
            )
                .then(response => {
                    console.log(response)
                    if (response.ok) {
                        return response.json()
                    }
                    else {
                        if (response.status === 401) {
                            throw Error('refresh')
                        }
                        throw Error(`Something went wrong: code ${response.status}`)
                    }
                })
                .then(({data}) => {
                    // setFirstName(data.first_name)
                    // setLastName(data.last_name)
                    // setUsername(data.username)
                    // setEmail(data.email)
                    // setDateJoined(data.date_joined)
                    setError(null)
                    localStorage.setItem('userId', data.id)
                    dispatch(createAction_setUserStatus(true))
                    const base_pages = [
                        {
                            title: 'Домашняя страница',
                            link: '/'
                        },
                        {
                            title: 'Задачи',
                            link: '/tasks'
                        },
                        {
                            title: 'События',
                            link: '/events'
                        },
                        {
                            title: 'Заметки',
                            link: '/notes'
                        }
                    ]
                    dispatch(createAction_setAppBarLinks(base_pages))
                    history.push('/')

                })
                .catch(error => {
                    console.log(`ОШибка:${error.message}`)
                    if (error.message === 'refresh') {
                        setRefreshRequired(true)
                    } else {
                        console.log(error)
                        setError('Ошибка, подробности в консоли')
                    }
                })
        }
    }, [access])

    useEffect(() => {

        if (refreshRequired) {
            fetch(
                'http://192.168.184.184:8000/api/token/refresh',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    body: JSON.stringify({ refresh })
                }
            )
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw Error(`Something went wrong: code ${response.status}`)
                    }
                })
                .then(({access, refresh}) => {
                    localStorage.setItem('accessToken', access)
                    setAccess(access)
                    localStorage.setItem('refreshToken', refresh)
                    setRefresh(refresh)
                    setError(null)

                })
                .catch(error => {
                    console.log(error)
                    setError('Ошибка, подробности в консоли')
                })
        }
    }, [refreshRequired])


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Авторизация
                    </Typography>
                    <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Имя пользователя"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/reg" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}