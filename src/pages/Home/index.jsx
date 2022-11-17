import './styles.css'
import {Card} from '../../components/Card'
import { useReducer, useState } from 'react'
import { useEffect } from 'react'
/* 
O padrão de importação acima, usando {Card}, foi feito usado
porque quando exportamos o Card usamos export function em vez
de colocar export default no final do arquivo
*/
function Home() {
  const [studentName, setStudentName] = useState()
  const [students, setStudents] = useState([])
  const [user, setUser] = useState({name: '', avatar: ''})

  function handleAddStudent(){
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }

    setStudents(prevState => [...prevState, newStudent])
  }

  useEffect(() => {
    fetch('https://api.github.com/users/DiegoAVaz')
    .then(response => response.json())
    .then(data => {
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      })
    })
  },[])

  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil" />
        </div>
      </header>
      <input 
        type="text" 
        placeholder="Digite o nome..." 
        onChange={e => setStudentName(e.target.value)} 
      />
      <button type="button" onClick={handleAddStudent}>Adicionar</button>
      {
        students.map(student => (
          <Card 
            key={student.time}
            name={student.name} 
            time={student.time}
          />
        ))
      }
    </div>
  )
}

export default Home

// Podemos usar div em vez do <></> para empacotar os elementos