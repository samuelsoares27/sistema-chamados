import { useState, createContext, useEffect } from "react";
import firebase from "../services/firebaseConnection";
import { toast } from 'react-toastify';

export const AuthContext = createContext({});

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        function loadStorage() {
            const storageUser = localStorage.getItem('SistemaUser');
            if (storageUser) {
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
            setLoading(false); 
        }

        loadStorage();

    }, []);


    async function signIn(email, senha) {

        setLoadingAuth(true);
        await firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(async (value) => {
                let uid = value.user.uid;                
                let user = await firebase.firestore().collection('users').doc(uid).get();    
                let data = {
                    uid: user.data().uid,
                    nome: user.data().nome,
                    email: user.data().email,
                    avatarUrl: user.data().avatarUrl
                };

                setUser(data)
                storageUser(data);
                setLoadingAuth(false);
                toast.success(`Olá ${user.data().nome} !`);


        }).catch((error) => {
            console.log(error);
            toast.error('Ops, algo deu errado!');
            setLoadingAuth(false);
        })
    }

    async function signUp(email, senha, nome) {
        
        setLoadingAuth(true);
        await firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then(async (value) => {
                
                let uid = value.user.uid;
                await firebase.firestore().collection('users').doc(uid)
                    .set({
                        nome: nome,
                        avatarUrl: null
                    }).then(() => {
                        
                        let data = {
                            uid: uid,
                            nome: nome,
                            email: email,
                            avatarUrl: null
                        };

                        setUser(data)
                        storageUser(data);
                        setLoadingAuth(false);
                        toast.success('Cadastrado com sucesso, Bem-vindo a plataforma');

                    }).catch((error) => {
                        console.log(error);              
                        toast.error('Ops algo deu errado!');
                        setLoadingAuth(false);
                    })
                
            }).catch((error) => {
                console.log(error);
                toast.error('Ops algo deu errado!');
                setLoadingAuth(false);
            })
    }

    async function signOut() {
        await firebase.auth().signOut();
        storageUserClear();
        setUser(null);
    }

    function storageUser(data) {
        localStorage.setItem('SistemaUser', JSON.stringify(data));
    }

    function storageUserClear() {
        localStorage.removeItem('SistemaUser');
    }

    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                loading,
                signUp,
                signOut,
                signIn,
                loadingAuth
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;