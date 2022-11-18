React JS

Para criar um projeto React, foi criada uma pasta chamada discover.
Então, foi criado um projeto com:
'''
npm create vite@latest reactApp --template react
'''
Depois, rodamos os comandos a seguir:
'''
cd reactapp
npm install
npm run dev
'''
O local onde o projeto está rodando aparecerá.

Repare que dentro do arquivo index.html, dentro da tag body, existe uma div. O conteúdo dessa div está sendo importado do arquivo main.jsx que está na pasta src. Na pasta src está sendo renderizados pelo ReactDOM o componente <App />. Este componente está sendo importado do arquivo App.jsx. Por fim, dentro do arquivo App.jsx está todo o conteúdo que está sendo renderizado.

Os arquivos com extensão .jsx. Essa é a sintaxe que o react usa para que possamos criar nossas interfaces de forma declarativa. 
Dentro de um arquivo .jsx teremos uma função e o retorno desta função será um conteúdo html. 
No react tudo á javascript, mas teremos funções retornando conteúdo html que será renderizado para o usuário.

Nos arquivos .jsx, o retorno das funções com os conteúdos HTML devem sempre retornar um valor apenas. Dessa maneira, se você cria várias elementos, dará erro. Então os elementos devem ser “empacotados” para voltar sempre um único valor. 
Para isso, podemos criar “Fragments” com tags vazias da seguinte maneira:
```
function Home(){
	return(
		<>
			<h1>Elemento 1<h1/>
			<h2>Elemento 2<h2/>
			<h3>Elemento 3<h3/>
		</>
	)
}
```
Podemos também colocar dentro de uma div:
```
function Home(){
	return(
		<div>
			<h1>Elemento 1<h1/>
			<h2>Elemento 2<h2/>
			<h3>Elemento 3<h3/>
		</div>
	)
}
```
Importando CSS:

Para importar CSS para nosso projeto foi criada uma pasta styles dentro da pasta src. 
É considerada uma boa prática resetarmos o estilo de nossa página, uma vez que as configurações iniciais são diferentes em cada navegador.  Desta forma, foi criado uma arquivo global.css dentro da pasta styles com as seguintes configurações padrão, apenas como exemplo:
```
*{
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
```
Para de fato importá-lo, basta acessar nosso arquivo main.jsx e adicionar import + o caminho do arquivo, da seguinte forma:
```
Import ‘./styles/global.css’
```


Separando CSS:

Para separar a estilização e criarmos uma estrutura mais organizada, criamos uma pasta dentro da pasta pages com o nome da página na qual vamos trabalhar, jogando o arquivo da página pra dentro dela. No nosso caso, criamos uma pasta chamada Home dentro da pasta pages. Depois, passamos nosso arquivo home.jsx pra dentro dela e o renomeamos para index.jsx. Depois disso, criamos um arquivo styles.css dentro da pasta Home e o importamos dentro de nosso arquivo index.jsx. Este arquivo será usado para estilização individual da página Home. Esse processo será feito com todos as demais páginas do nosso projeto. 



Importando fontes:

Para importar fontes para nosso projeto, podemos ir até algum repositório na internet que disponibilize fontes, copiar os links fornecidos para o import e colar na tag <head> do nosso arquivo index.html dentro da pasta principal.
Para usá-los podemos abrir o nosso arquivo global.css dentro da pasta styles e adicioná-los aos elementos que quisermos, como no exemplo abaixo:
```
body, input, button {
	font-size: 16px;
	font-family: ‘Roboto’, sans-serif;
	-
}
```


Componentes

Iremos usar uma estrutura de pastas e arquivos parecida com o que fizemos anteriormente para estilizar as páginas.
Dentro da pasta src iremos criar uma pasta chamada components. Dentro dessa pasta criaremos uma pasta para os componentes do nosso projeto, como, por exemplo, nossos Cards.
Ao criar a pasta Card, criamos dentro dela o arquivo index.jsx e o arquivo styles.css. 
Dentro do arquivo index.jsx iremos importar nosso arquivo styles.css e criar a estrutura básica, exportando a função que terá como retorno nosso conteúdo HTML. Como no exemplo abaixo:
```
import ‘./styles.css’

export function Card(){
	return(
		<div>
            		<strong>Rodrigo Gonçalves</strong>
            		<small>10:15:24</small>
		</div>
	)
}
```
Para importar este componente, iremos no arquivo index.jsx na pasta Home, faremos a importação da seguinte forma:
```
import {  Card  } from ‘../../components/Card’
```
E usamos o código <Card /> para posicioná-lo onde quisermos em nosso código.

Importante: note que para importar utilizamos {  Card  } em vez de apenas escrever Card. Isso ocorre porque para exportá-lo usando export function em vez de export default. 


Propriedades

Para deixar nossos componentes dinâmicos e passar a eles propriedades e informações a ser apresentadas devemos passar essas propriedades a ele. 
Para isso, vamos ao nosso arquivo index.jsx dentro da pasta Home e na tag <Card> passaremos as propriedades desta maneira:
```
<Card name=‘Rodrigo’ time=’10:55:25’ />
<Card name=‘João’ time=’11:00:10’ />
```
Depois, iremos ao nosso arquivo index.jsx na pasta Card e passaremos a palavra “props” como parâmetro da nossa função Card, além de adicionar o valor da propriedade ao nosso conteúdo da seguinte forma:
```
import ‘./styles.css’

export function Card(props){
	return(
		<div>
            		<strong>{props.name}</strong>
            		<small>{props.time}</small>
		</div>
	)
}
```

Estado

A ideia da nossa lista de presença é que possamos digitar nosso nome no input e ele apareça nos cards.

Para isso, vamos importar React useState para o arquivo index.jsx na pasta Home, da seguinte forma:
```
import React, { useState } from ‘react’
```
Agora, para criar um estado, criaremos uma const com dois elementos: studentName, que vai armazenar conteúdo do estado, e setStudentName, que é a função que vai atualizar este estado. Vamos atribui a essa const a função importada useState(). Fica assim:

Const [studentName, setStudentName] = useState()

Em seguida, vamos adicionar o evento onChange em nosso input e criar uma arrow function que vai dar o valor atual do input sempre que ele muda e passá-lo como parâmetro para a função handleNameChange, da seguinte forma:

onChange={e => handleNameChange(e.target.value)}

Agora, apenas como exemplo, caso mudemos o conteúdo de nossa h1 de ‘Lista de Presença’ para ‘nome: {studentName}’ (o {} serve para passarmos a variável que está armazenando o estado), notaremos que o valor digitado é apresentado na tela em tempo real. 


Imutabilidade

A imutabilidade é um princípio que diz que, por questões de praticidade e performance, um conteúdo não deve ser alterado, mas sim substituído. 
Agora vamos usar a useState em outra const da seguinte forma:

Const [students, setStudents] = useState([])

Perceba que, de início, o estado que criamos é um vetor vazio ([]) e nele vamos armazenas os estudantes da lista.

Depois vamos envolver nosso Card em {} da seguinte forma:

{
	students.map(student => <Card name={student.name}time={student.time}/>)
}

Aqui criamos uma estrutura de repetição, que irá percorrer os elementos da lista e exibir em nosso card cada um deles, onde passamos as propriedades {student.name} e {student.time}.

Depois, criamos uma função para lidar com as informações dos estudantes adicionados, onde criamos um objeto newStudent com essas informações e, no final, passamos este objeto para a nossa função setStudents:
```
function handleAddStudent(){
	const newStudent = {
		name: studentName,
		time: new Date().toLocaleTimeString(“pt-br”, {
			hour: ‘2-digit’,
			minute: ‘2-digite’,
			second: ‘2-digite’
		})
	}
	setStudents([newStudent])
}
```
Depois, colocamos o evento onClick no button para que ele chame a função handleAddStudent() sempre que for clicado:
```
onClick={handleAddStudent}
```
Feito isso, assim que o aluno adicionar seu nome no input e clicar no botão adicionar, o nome dele aparecerá no card logo abaixo. 
Mas lembre-se: segundo o princípio da imutabilidade, sempre que um novo estudante escrever o nome dele, esse card será apagado e substituído por um novo, com o nome do novo aluno. 
Para resolver esse problema, devemos voltar na nossa função handleAddStudent e na chamada da função setStudents fazer a seguinte alteração:

setStudents([prevState => […prevState, newStudent]])

Feito isso, o parâmetro que estaremos passando será estado anterior de nosso estado students junto com o novo aluno que está sendo adicionado agora. O … (Spread Operator) serve para que o array seja “desempacotado” dentro do novo array.


Key prop

É importante que, quando criarmos componentes baseados em estruturas de repetição, como a deste exemplo, usemos chaves únicas para identificá-los. No nosso exemplo podemos fazer isso na nossa tag <Card> usando o horário da seguinte forma:
```
key= {student.time}
name={student.name}
time={student.time}
```
Desta forma não há risco de criarmos o componente com as mesmas informações duas vezes em nosso código.

Hooks

São funções que permitem conectar os recursos de estado e ciclo de vida do React a partir de componentes totalmente funcionais, favorecendo o paradigma funcional. O useState, por exemplo, é um Hook

Headers

Vamos adicionar uma imagem e o nome do usuário para representar, por exemplo, a pessoa que está fazendo a chamada. 
Para isso, vamos colocar nosso título num Header e acrescentar uma div com alguns elementos, da seguinte forma:
```
<header>
	<h1>Lista de Presença</h1>
	<div>
		<strong>Diego</strong>
		<img src="https://github.com/DiegoAVaz.png" alt="Foto de perfil" />
	</div>
</header>
```

useEffect

Outro hook muito utilizado é o use effect. Ele é executado sempre que o estado de nossa interface ou de algum componente é renderizados. 
Para importá-lo, basta ir até aonde importamos o useState e adicioná-lo ao lado:

Import React, {  useState, useEffect  } from ‘react’

E para usá-lo, vamos adicionar o seguinte código logo antes da palavra return da nossa função home do arquivo index.jsx da pasta Home:
```
useEffect(() => {
	
}, [])
```
Entre as {} estará o que será executado. No array [] estarão os elementos ou componentes a ser renderizados para disparar o useEffect.

Consumindo API:

Por enquanto a imagem e o nome que colocamos na div em nosso reader estão estáticos, porém podemos obter essas informações através do consumo de APIs.
Para isso, vamos usar a API do Github e o fetiche dentro da função useEffect:
```
useEffect(() => {
	fetch(‘https://api.github.com/users/DiegoAVaz’)
	.then(response => response.json())
	.then(data => {

	})
}, [])
```
Depois, criamos um novo estado “user” da seguinte forma:
```
const [user, setUser] = useState({ name: ‘’, avatar: ‘’ })
```
Em nossa div do reader, colocaremos como conteúdo o nome de usuário que será consumido pela API e a imagem:
```
<strong>{user.name}</strong>
<img src={user.avatar} alt="Foto de perfil" />
```
