# Limp Dog Banho e Tosa

Projeto-fonte do site institucional da Limp Dog, em Limeira — SP.

## Estrutura

- `src/index.html`: conteúdo e estrutura editáveis da página.
- `src/styles.css`: estilos, responsividade e identidade visual.
- `src/script.js`: menu móvel, ano automático e animações de entrada.
- `src/assets/`: imagens utilizadas pelo site.
- `dist/`: versão compilada e pronta para publicação.
- `.openai/hosting.json`: configuração do projeto hospedado.
- `scripts/`: comandos locais de desenvolvimento e compilação.

## Editar localmente

É necessário ter o Node.js 18 ou mais recente.

```bash
npm run dev
```

O projeto ficará disponível em `http://127.0.0.1:4173`.

## Gerar a versão compilada

```bash
npm run build
```

O comando recria a pasta `dist/` a partir dos arquivos de `src/`. A pasta `dist/` é mantida no Git para preservar a versão pronta para deploy.

## Publicação

O projeto está configurado para publicar o conteúdo de `dist/`. Sempre execute `npm run build` depois de editar os arquivos de `src/` e antes de enviar uma nova versão.
