# @heeca/ui — design system "clean" da Heeca

Fonte da verdade do visual compartilhado entre o portal (heeca.com.br) e os produtos. Mesmo desenho do kit de marca (`../brand`): **nada aqui é consumido por import de pacote** — cada app copia o que usa com um script (`pnpm ui` no portal), então o build em produção não depende de registry nem de acesso a repositório privado.

| Arquivo | Papel |
|---|---|
| `tokens.css` | Variáveis CSS (cores, raio, acentos por produto). Copiado para o `globals.css` do portal; produtos com tokens próprios seguem o **mapa por app** abaixo |
| `src/index.tsx` | Primitivos React (Container, Section, PageHeader, Breadcrumb, Button, Field, Badge, Table, Stepper, Notice…). Copiado para `heeca_site/src/ui/index.tsx` |
| `layout.md` | Regras do layout clean (o que é obrigatório numa tela) |

## O layout em uma frase

Header branco com **filete de 3 px na cor do produto**, breadcrumb, **título de página leve (peso 400) na cor do produto** seguido de regra fina, seções separadas por linha, grades "rótulo: valor", **botão primário quase-preto** (`#0a0a0a`), cor do produto só em marca, filete, títulos, links e estados selecionados; rodapé escuro.

## Tokens — três papéis que não se misturam

| Papel | Token | Uso |
|---|---|---|
| **Marca** | `--brand` (vermelho Heeca) | logo da plataforma, filete do portal |
| **Acento do produto** | `--accent` / `--accent-dark` / `--accent-soft` (`data-accent="ticket|dental|vendas|budget|nail|barbearia"`) | filete do header do produto, título da página, links, chips/abas selecionados, ícones de destaque, foco |
| **Ação primária** | `--primary` (quase-preto) + `--primary-hover` + `--primary-foreground` | botão principal de cada tela. **Nunca** a cor do produto |

Dinheiro/estado usam `--success` / `--warning` / `--danger`; cor de produto nunca carrega significado.

## Mapa por app (quem já tinha tokens semânticos)

Ticket e Dental nasceram com `--primary` = cor do produto e classes `bg-primary`/`text-primary` espalhadas com sentido de **acento** (títulos `ht-page-title`, links, abas). Em vez de renomear tudo, o mapa é:

| Conceito clean | Portal / Vendas | Ticket / Dental |
|---|---|---|
| acento do produto | `--accent` | `--primary` (mantém) |
| botão primário quase-preto | `--primary` | **`--action`** / `--action-hover` / `--action-foreground` (novo) |
| filete do header | `border-b-[3px] border-accent` | `border-b-[3px] border-primary` |
| título de página | `PageHeader` (peso 400, `text-accent`) | `.ht-page-title` / `.hs-page-title` (peso 400, `text-primary`) |

Regra prática nesses apps: `Button variant="primary"` e CTAs (`inline-flex h-9 … bg-action text-action-foreground`) são quase-pretos; `bg-primary text-primary-foreground` fica **só** para aba/chip selecionado.

## Fluxo de mudança

1. Edite aqui (`tokens.css`, `src/index.tsx`).
2. Portal: `pnpm ui` copia `src/index.tsx` para `heeca_site/src/ui/index.tsx` (e avisa se o bloco de tokens do `globals.css` divergiu).
3. Produtos com tokens próprios: aplique a mudança equivalente pelo mapa acima.
4. Commit aqui e no app; nunca edite a cópia no app.
