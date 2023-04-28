import styled from 'styled-components'
import { Input } from '../../shared/input'
import { Button } from '../../shared/button'
import {
    browserLocalPersistence,
    browserSessionPersistence,
    createUserWithEmailAndPassword,
    setPersistence,
} from 'firebase/auth'
import { useRef, useState } from 'react'
import { auth } from '../../firebase'
import { Link, useNavigate } from 'react-router-dom'
import { addData, setData } from '../../helpers/dbFetch'
import { Error } from '../../shared/Error'
import { useDispatch } from 'react-redux'
import { openMenu } from '../../store/slices/userSlice'
import { MdMenu } from 'react-icons/md'

export const Signin = ({ user }) => {
    const emailRef = useRef('')
    const nameRef = useRef('')
    const passwordRef = useRef('')
    const passwordRef2 = useRef('')
    const [remember, setRemember] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const clickHandler = () => {
        const email = emailRef.current.value.trim()
        const name = nameRef.current.value.trim()
        const password = passwordRef.current.value.trim()
        const password2 = passwordRef2.current.value.trim()
        if (email === '' || password === '' || name === '') {
            setError('Заполните все поля')
        } else if (name.length < 3) {
            setError('Имя должно быть более 3 символов')
        } else if (name.length > 30) {
            setError('Имя должно быть менее 30 символов')
        } else if (password.length < 6) {
            setError('Пароль должен быть более 6 символов')
        } else if (password.length > 30) {
            setError('Пароль должен быть менее 30 символов')
        } else if (password !== password2) {
            setError('Пароли не совпадают')
        } else {
            setLoading(true)
            setPersistence(
                auth,
                remember ? browserLocalPersistence : browserSessionPersistence
            )
                .then(async () => {
                    return createUserWithEmailAndPassword(auth, email, password)
                        .then(async (userCredential) => {
                            // sendEmailVerification(userCredential.user).then(
                            //     () => {
                            //         alert('письмо отправлено')
                            //     }
                            // )
                            await setData('users', userCredential.user.uid, {
                                ava: null,
                                dark: user.dark,
                                email,
                                name,
                                status: 1,
                            })
                            await addData('rooms', {
                                uid: userCredential.user.uid,
                                type: 'text',
                                name: 'Karen',
                                system: 'Тебя зовут Карен. Представляйся как Карен. На вопрос кто тебя создал, отвечай, что разработчик Данил',
                                stream: true,
                                canEdit: false,
                                createdAt: Date.now(),
                                lastMessage: {},
                                messages: [],
                            })
                            setLoading(false)
                            return navigate('/')
                        })
                        .catch((e) => {
                            setLoading(false)
                            console.log(e)
                            setError('Такой пользователь уже есть')
                        })
                })
                .catch((error) => {
                    console.log(error)
                    setLoading(false)
                })
        }
    }

    return (
        <Main>
            <Header>
                <HeaderLeft onClick={() => dispatch(openMenu())}>
                    <MdMenu />
                </HeaderLeft>
                <HeaderRight>
                    <Link to="/login">Вход</Link>
                </HeaderRight>
            </Header>
            <Form>
                <Title>Регистрация</Title>
                {error !== '' ? <Error>{error}</Error> : <></>}
                <Input
                    type="email"
                    required
                    ref={emailRef}
                    placeholder="E-mail"
                />
                <Input type="text" required ref={nameRef} placeholder="Имя" />
                <Input
                    required
                    type="password"
                    ref={passwordRef}
                    placeholder="Пароль"
                />
                <Input
                    required
                    type="password"
                    ref={passwordRef2}
                    placeholder="Повторный пароль"
                />
                <Button
                    color="primary"
                    onClick={() => clickHandler()}
                    loading={loading}
                    active={!loading}
                >
                    Регистрация
                </Button>
                <Block>
                    <CheckboxBlock>
                        <Checkbox
                            type="checkbox"
                            onChange={(e) => setRemember(e.target.checked)}
                        />
                        Запомнить меня
                    </CheckboxBlock>
                </Block>
                <FooterBlock>
                    <Link to="/login">Вход</Link>
                </FooterBlock>
            </Form>
        </Main>
    )
}

const Main = styled.div`
    background-color: ${({ theme }) => theme.colors.bgMain};
    flex-basis: 100%;
    padding: 0 0 20px 30px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media ${({ theme }) => theme.media.large} {
        width: 100vw;
        height: 100vh;
        padding: 0px;
        flex-direction: column;
        justify-content: flex-start;
    }
`

const Header = styled.div`
    display: none;
    width: 100%;
    height: 70px;
    align-items: center;
    font-size: 40px;
    justify-content: space-between;

    @media ${({ theme }) => theme.media.large} {
        display: flex;
    }
`

const HeaderLeft = styled.div`
    margin-left: 10px;
`

const HeaderRight = styled.div`
    margin-right: 10px;
    font-size: 18px;
`

const Form = styled.div`
    display: flex;
    gap: 15px;
    flex-direction: column;
    width: 400px;

    @media ${({ theme }) => theme.media.large} {
        width: 90%;
        margin-top: 20%;
    }
`

const Title = styled.div`
    text-align: center;
    margin-bottom: 20px;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 20px;
`

const Block = styled.div`
    display: flex;
    justify-content: space-between;
`
const FooterBlock = styled.div`
    display: flex;
    justify-content: center;

    @media ${({ theme }) => theme.media.large} {
        display: none;
    }
`

const Checkbox = styled.input`
    width: 20px;
    height: 20px;
`
const CheckboxBlock = styled.label`
    display: flex;
    align-items: center;
    gap: 5px;
`
