# Instruções

## Legibilidade

**Números Mágicos:**

Sempre crie variáveis caso precise utilizar um número ou string para fazer uma regra.

_Exemplo:_

```typescript
// Errado
if (id === 2) {
  return <Audio />
}
```

```tsx
// Certo
const imageId = 1;
const audioId = 2;

if (id === audioId) {
  return <Audio />
}
```

**Cores:**

Sempre utilize essa [ferramenta](https://dequeuniversity.com/rules/axe/2.2/color-contrast?application=lighthouse) para verificar se a cor tem uma boa acessibilidade.

[Voltar ao índice](./index.md)

### Media Queries

Siga o padrão abaixo:

```css
@media (min-width: 768px) {}
@media (min-width: 992px) {}
@media (min-width: 1200px) {}
```
