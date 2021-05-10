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

**Components:**

Caso queira dividir uma página muito grande em componentes que você não vai reutilizar, use a pasta `src/components/Splitter` para colocar seus componentes.
Todos os componentes dessa pasta não serão reutilizado, caso você reutilize algum desses componentes, crie uma pasta só para ele.

> Nota: não divida o styled component para aquele componente, apenas o JSX mesmo.

### Media Queries

Siga o padrão abaixo:

```css
@media (min-width: 768px) {}
@media (min-width: 1100px) {}
@media (min-width: 1200px) {}
@media (min-width: 1440px) {}
```

#### Hooks

**postAsLink.ts:**

Posts e Shares precisam ser um link, porém a tag ```<a>``` não pode ser aninhada. Por isso o hook _usePostAsLink_ foi criado. Coloque a classe `not-post-redirect` para privinir o hook de redirecionar para o local do post.
