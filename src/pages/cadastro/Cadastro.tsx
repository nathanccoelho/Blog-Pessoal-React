import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'

import { cadastrarUsuario } from '../../services/Service'
import Usuario from '../../models/Usuario'

import './Cadastro.css'
import { toastAlerta } from '../../utils/toastAlerta'

function Cadastro() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [confirmaSenha, setConfirmaSenha] = useState<string>("")

    const [usuario, setUsuario] = useState<Usuario>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: ''
    })

    useEffect(() => {
        if (usuario.id !== 0) {
            retornar()
        }
    }, [usuario])

    function retornar() {
        navigate('/login')
    }

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
        setConfirmaSenha(e.target.value)
    }

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {
            setIsLoading(true)

            try {
                await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario)
                toastAlerta('Usuário cadastrado com sucesso', "sucesso")
            } catch (error) {
                toastAlerta('Erro ao cadastrar o Usuário', "erro")
            }

        } else {
            toastAlerta('Erro ao cadastrar o Usuário', "erro")
            setUsuario({ ...usuario, senha: "" })
            setConfirmaSenha("")
        }

        setIsLoading(false)
    }
    return (
        <>
           <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8 bg-indigo-800 bg-no-repeat bg-cover relative ">
                <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                <div className="max-w-md w-full  px-10 pb-2 bg-white rounded-xl z-10">
                
                <form
                    className='flex justify-center items-center flex-col w-full gap-3'
                    onSubmit={cadastrarNovoUsuario}>
                    <h2 className="mt-2 mb-2 text-5xl font-bold text-gray-900">Cadastrar</h2>
                    <div className="flex items-center justify-center space-x-2">
                        <span className="h-px w-16 bg-gray-300"></span>
                        <span className="h-px w-16 bg-gray-300"></span>
                        <span className="h-px w-16 bg-gray-300"></span>
                    </div>
                    <div className="flex flex-col w-full">
                    <label className="text-sm font-bold text-gray-700 tracking-wide">Nome</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            placeholder="Digite seu nome"
                            className=" w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                            value={usuario.nome}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="text-sm font-bold text-gray-700 tracking-wide">E-mail</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Digite seu E-mail"
                            className=" w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                            value={usuario.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="text-sm font-bold text-gray-700 tracking-wide">Foto</label>
                        <input
                            type="text"
                            id="foto"
                            name="foto"
                            placeholder="Cole a URL de uma foto"
                            className=" w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                            value={usuario.foto}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="text-sm font-bold text-gray-700 tracking-wide">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Digite sua senha"
                            className=" w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                            value={usuario.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="text-sm font-bold text-gray-700 tracking-wide">Confirmar Senha</label>
                        <input
                            type="password"
                            id="confirmarSenha"
                            name="confirmarSenha"
                            placeholder="Confirme sua senha"
                            className=" w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                            value={confirmaSenha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
                        />
                    </div>
                    
                    <div className="flex justify-around w-full gap-8">
                        <button
                             className="w-full flex justify-center bg-red-500 text-gray-100 p-4  rounded-full tracking-wide
                             font-semibold  focus:outline-none focus:shadow-outline hover:bg-red-600 shadow-lg cursor-pointer transition ease-in duration-300"
                            
                            onClick={retornar}>
                            Cancelar
                        </button>
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

                                    <span>Cadastrar</span>}
                        </button>
                    </div>
                </form>
            </div>
            </div>
        </>
    )
}

export default Cadastro