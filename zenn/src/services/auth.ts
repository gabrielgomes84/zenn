import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";

// Cadastrar novo usuário
export async function registrarUsuario(nome: string, email: string, senha: string) {
  const cred = await createUserWithEmailAndPassword(auth, email, senha);
  await setDoc(doc(db, "usuarios", cred.user.uid), {
    id: cred.user.uid,
    nome,
    email,
    senha,
    data_criacao: serverTimestamp(),
  });
  return cred.user.uid;
}

// Fazer login
export async function logarUsuario(email: string, senha: string) {
  const cred = await signInWithEmailAndPassword(auth, email, senha);
  return cred.user.uid;
}
