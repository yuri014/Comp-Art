# Padronização React

**Não Faça:**

```typescript
const [state, setState] = useState(prop.text);
```

**Faça:**

```typescript
const [state, setState] = useState('');

useEffect(() => {
  setState(prop.text);
}, [prop.text])
```

> O estado inicial nunca deve ser uma propriedade externa, se você precisa que uma propriedade externa seja o estado inicial, crie um cópia dela que se atualiza a cada atualização.\
> **Motivo:** o componente é invocado apenas uma vez, se os valores externos mudarem, seu componente não irá atualizar.

**Não Faça:**

```typescript
const [state, setState] = useState({
  name: '',
  email: '',
  password: '',
});
```

**Faça:**

```typescript
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
```

> Prefira dividir em múltiplos estados.\
> **Motivo:** cada vez que um ''setState'' é chamado, o ''render()'' é chamado. Utilizando um objeto nesse caso, faria com que a mudança do ''name'' renderizasse ''email'' e ''password'' como efeito colateral. Separando os estados faria com que a mudança do ''name'' só renderizasse só o ''name'', sem renderizar outros estados como efeito colateral.\
> **Nota:** Utilize objetos quando você atualiza os elementos do objeto em uma mesma função.

**Não Faça:**

```tsx
export default function App() {
  const [color, setColor] = useState('red');
  return (
    <div>
      <input value={color} onChange={(e) => setColor(e.target.value)} />
      <p style={{ color }}>Hello, world!</p>
      <ExpensiveTree />
    </div>
  );
}
```

**Faça:**

```tsx
function Form() {
  const [color, setColor] = useState('red');
  return (
    <>
      <input value={color} onChange={(e) => setColor(e.target.value)} />
      <p style={{ color }}>Hello, world!</p>
    </>
  );
}

export default function App() {
  return (
    <>
      <Form />
      <ExpensiveTree />
    </>
  );
}
```

> **Motivo:** ao separar os componentes, evitamos que o component `<ExpensiveTree />` se importe com o estado `color`. Isso fará com que apenas o `<Form />` re-renderize ao mudar de estado.\
> **Nota:** Faça essa regra apenas quando a alteração for fácil e não prejudicará a manutenção.

[*Leia mais*](https://overreacted.io/pt-br/before-you-memo/)

[Voltar ao índice](./index.md)
