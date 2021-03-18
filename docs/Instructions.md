# Instruções

## Legibilidade

**Números Mágicos:**

Sempre crie variáveis caso precise utilizar um número ou string para fazer uma regra.

_Exemplo:_

```typescript
// Errado
if (id !== 2) {
  return <Audio />
}
```

```tsx
// Certo
const imageId = 1;
const audioId = 2;

if (id !== audioId) {
  return <Audio />
}
```

[Voltar ao índice](./index.md)
