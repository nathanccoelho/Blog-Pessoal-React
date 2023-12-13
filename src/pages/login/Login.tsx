import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { AuthContext } from '../../contexts/AuthContext';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import UsuarioLogin from '../../models/UsuarioLogin';
import { RotatingLines } from 'react-loader-spinner';
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

function Login() {

    const navigate = useNavigate();
    const { usuario, handleLogin, isLoading } = useContext(AuthContext);
    const [mostrarSenha, setMostrarSenha] = useState<boolean>(false)

    const handleToggleSenha = () => {
        setMostrarSenha(!mostrarSenha);
    }

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {} as UsuarioLogin
    );

    useEffect(() => {
        if (usuario.token !== "") {
            navigate('/home')
        }
    }, [usuario])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        })
    }

    function login(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        handleLogin(usuarioLogin)
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8 bg-indigo-800 bg-no-repeat bg-cover relative ">
                <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                <div className="max-w-md w-full  px-10 pb-2 bg-white rounded-xl z-10">
                    <div className="text-center">
                        <h2 className="mt-2 mb-2 text-5xl font-bold text-gray-900">
                            Iniciar sessão
                        </h2>
                    </div>
                   
                    <div className="flex items-center justify-center space-x-2">
                        <span className="h-px w-16 bg-gray-300"></span>
                        <span className="h-px w-16 bg-gray-300"></span>
                        <span className="h-px w-16 bg-gray-300"></span>
                    </div>
                    <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={login}>
                        <input type="hidden" name="remember" value="true" />
                        <div className="relative">
                           
                            <label className="text-sm font-bold text-gray-700 tracking-wide">Email</label>
                            <input className=" w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                                id='usuario'
                                name='usuario'
                                type="text"
                                placeholder="Digite seu email"
                                value={usuarioLogin.usuario}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
                        </div>
                        <div className="mt-8 content-center relative h-11 w-full min-w-[200px]">

                            <label className="text-sm font-bold text-gray-700 tracking-wide">
                                Senha
                            </label>
                            <input className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                                type={mostrarSenha ? 'text' : 'password'}
                                id='senha'
                                name='senha'
                                placeholder="Digite sua senha"
                                value={usuarioLogin.senha}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
                            <button
                                type="button"
                                className="absolute right-3 mt-3 transform "
                                onClick={handleToggleSenha}
                            >
                                {mostrarSenha ? <RiEyeLine /> : <RiEyeOffLine />}
                            </button>

                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 bg-indigo-500 focus:ring-indigo-400 border-gray-300 rounded" />
                                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                    Lembre-me
                                </label>
                            </div>
                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-500 hover:text-indigo-500 no-underline hover:underline cursor-pointer transition ease-in duration-300">
                                    Esqueceu a senha?
                                </a>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center bg-indigo-500 text-gray-100 p-4  rounded-full tracking-wide
                                font-semibold  focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300">
                                {isLoading ? <RotatingLines
                                    strokeColor="white"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="24"
                                    visible={true}
                                /> :

                                    <span>Login</span>}
                            </button>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                            <span className="h-px w-16 bg-gray-300"></span>
                            <span className="h-px w-16 bg-gray-300"></span>
                            <span className="h-px w-16 bg-gray-300"></span>
                        </div>
                        <p className="flex items-center justify-center mt-10 text-center text-md text-gray-500">
                            <span> Ainda não tem uma conta? </span>
                            <a href="#" className="text-indigo-500 hover:text-indigo-500 ml-2 no-underline hover:underline cursor-pointer transition ease-in duration-300"><Link to={"/cadastro"}>Cadastre-se</Link></a>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;