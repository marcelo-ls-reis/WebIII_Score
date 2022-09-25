import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";
import { addDoc, collection, getDocs, getFirestore, doc, deleteDoc } from 'firebase/firestore'

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCcPTB-pPjsT6-W9mptP5dPIZKZalz96ys",
  authDomain: "cliente-91561.firebaseapp.com",
  projectId: "cliente-91561",
  storageBucket: "cliente-91561.appspot.com",
  messagingSenderId: "577077927105",
  appId: "1:577077927105:web:f49c15c479c969422d0840",
  measurementId: "G-WCH9WJ0PZ8"
});

export const App = () => {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [users, setUsers] = useState([])

  const db = getFirestore(firebaseApp)
  const userCollectionRef = collection(db, "users")

  async function criarUser() {
    const user = await addDoc(userCollectionRef, {
      nome,
      email,
    })
    console.log(user)
  }

  async function deleteUser(id) {
    const userDoc = doc(db, "users", id)
    await deleteDoc(userDoc)
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef)
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getUsers()
  }, [])
  return (
    <div>
      <input type="text" placeholder="Nome..." value={nome} onChange={(e) => setNome(e.target.value)} />
      <input type="text" placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={criarUser} > Criar Cliente </button>

      <ul>
        {users.map(user => {
          return (
            <div key={user.id}>
              <li>{user.nome}</li>
              <li>{user.email}</li>
              <button onClick = {() => deleteUser(user.id)}>Deletar</button>
            </div>
          )
        })}
      </ul>
    </div>
  )
};

