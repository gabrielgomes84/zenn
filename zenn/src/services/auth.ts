//src/services/auth.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "./firebase";

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

export async function logarUsuario(email: string, senha: string) {
  const cred = await signInWithEmailAndPassword(auth, email, senha);
  return cred.user.uid;
}

export async function buscarDadosUsuario(uid: string) {
  const ref = doc(db, "usuarios", uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

export async function reautenticarUsuario(senhaAtual: string) {
  const user = auth.currentUser;
  if (!user || !user.email) throw new Error("Usuário não autenticado");

  const cred = EmailAuthProvider.credential(user.email, senhaAtual);
  await reauthenticateWithCredential(user, cred);
}

export async function atualizarSenhaComReautenticacao(novaSenha: string, senhaAtual: string) {
  await reautenticarUsuario(senhaAtual);
  const user = auth.currentUser;
  if (!user) throw new Error("Usuário não autenticado");
  await updatePassword(user, novaSenha);
}

export async function atualizarPerfilUsuario(uid: string, nome: string) {
  await updateDoc(doc(db, "usuarios", uid), { nome });
}