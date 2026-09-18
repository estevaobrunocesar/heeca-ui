# Layout clean — checklist de uma tela

Referência: telas do CrediPronto (header branco com faixa colorida, breadcrumb, título leve na cor da marca, regras finas, grades rótulo: valor, rodapé escuro), adaptada à paleta Heeca.

## Casca (app autenticado)

- **Topbar** branca, 56–64 px, `border-b-[3px]` na cor do produto (o filete). Logo do produto à esquerda (`<Logo product="…" />` do kit de marca), seletor de empresa/unidade quando houver, usuário e sair à direita. Sem sombra.
- **Sidebar** clara (fundo branco, texto cinza `--muted`), item ativo com tinta suave do acento (`--accent-soft` / `bg-primary/10`) e texto no acento. Ícones com traço 1.75.
- **Conteúdo** em branco; cartões com borda `--border` de 1 px e **sem sombra**; raio 6 px.

## Página

- **Breadcrumb** discreto acima do título (`Início / Módulo / Registro`), links no acento.
- **Título** `h1` peso 400, 24 px, cor do acento; subtítulo em `--muted`. Regra fina (`border-b`) separando o cabeçalho do conteúdo.
- **Seções** com título `h2` peso 500, 16 px, `--foreground`, separadas por regra fina — não por cartões aninhados.
- **Grades rótulo: valor** para detalhes (rótulo em `--muted` 13 px, valor em `--foreground`), 2–3 colunas no desktop, 1 no celular.

## Ações

- **Um** botão primário por tela, quase-preto (`--primary` no portal / `--action` no Ticket e Dental), altura 36–40 px, raio 6 px.
- Secundário: fundo branco, borda `--border`, texto `--foreground`. Perigo: `--danger`. Link de ação: acento, sublinhado no hover.
- Estados selecionados (abas, chips, dia na agenda): fundo no acento com texto branco, ou `--accent-soft` com texto no acento.

## Feedback

- Sucesso/aviso/erro usam `--success`/`--warning`/`--danger` (cor de produto nunca carrega significado).
- Estados vazios: texto em `--muted` com uma ação clara.

## Não faça

- Sombra em cartão, gradiente, cor de produto no botão primário, título em negrito, mais de um primário na tela.
