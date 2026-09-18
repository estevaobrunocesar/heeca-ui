/**
 * Design system Heeca ("clean") — primitivos compartilhados por portal e produtos.
 *
 * Regras que os componentes encodam (ver globals.css para os tokens):
 *  - uma só cor de ação (botão primário quase-preto); acento da marca/produto em
 *    títulos, filete do header, links e destaques — nunca em fundos grandes;
 *  - hierarquia por tipografia e regras finas, não por cartões com sombra;
 *  - cantos de 6px, sem pílulas;
 *  - conteúdo em grades de 2–3 colunas com muito respiro.
 *
 * Este diretório não importa nada do portal (lib/site, server/*): é o que permite
 * extraí-lo para o pacote @heeca/ui quando Ticket e Dental adotarem o layout.
 */
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ComponentProps, ReactNode } from "react";
import { Check, ChevronRight } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ----------------------------------------------------------------------------
// Layout
// ----------------------------------------------------------------------------

export function Container({ children, className, size = "lg" }: { children: ReactNode; className?: string; size?: "md" | "lg" }) {
  return <div className={cn("mx-auto w-full px-5 sm:px-8", size === "lg" ? "max-w-6xl" : "max-w-3xl", className)}>{children}</div>;
}

/** Bloco vertical de página. `tone="surface"` usa o cinza-claro para alternar seções. */
export function Section({ id, children, className, tone = "white", size = "md" }: { id?: string; children: ReactNode; className?: string; tone?: "white" | "surface" | "dark"; size?: "sm" | "md" | "lg" }) {
  const pad = { sm: "py-10 sm:py-12", md: "py-14 sm:py-20", lg: "py-20 sm:py-28" }[size];
  const bg = { white: "", surface: "bg-surface", dark: "bg-dark text-white" }[tone];
  return (
    <section id={id} className={cn(pad, bg, className)}>
      <Container>{children}</Container>
    </section>
  );
}

/** Título de seção com regra fina embaixo — o padrão "Comprador Principal" da referência. */
export function SectionTitle({ children, description, action, className }: { children: ReactNode; description?: ReactNode; action?: ReactNode; className?: string }) {
  return (
    <div className={cn("mb-6 border-b border-border pb-3", className)}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="text-xl font-medium tracking-tight text-foreground sm:text-2xl">{children}</h2>
        {action}
      </div>
      {description && <p className="mt-1 text-sm text-muted">{description}</p>}
    </div>
  );
}

/** Subtítulo dentro de uma seção ("Dados Gerais", "Contato"). */
export function GroupTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn("mb-3 text-base font-medium text-foreground", className)}>{children}</h3>;
}

// ----------------------------------------------------------------------------
// Cabeçalho de página: breadcrumb → título leve na cor de acento → subtítulo
// ----------------------------------------------------------------------------

export type Crumb = { label: string; href?: string };

export function Breadcrumb({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Você está aqui" className={cn("flex flex-wrap items-center gap-1.5 text-xs text-muted", className)}>
      {items.map((c, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="size-3 text-muted-2" aria-hidden />}
          {c.href ? <Link href={c.href} className="hover:text-foreground">{c.label}</Link> : <span className="text-foreground-2">{c.label}</span>}
        </span>
      ))}
    </nav>
  );
}

export function PageHeader({ crumbs, title, description, actions, eyebrow, className, size = "md" }: { crumbs?: Crumb[]; title: ReactNode; description?: ReactNode; actions?: ReactNode; eyebrow?: ReactNode; className?: string; size?: "md" | "lg" }) {
  return (
    <div className={cn("border-b border-border", className)}>
      <Container className={size === "lg" ? "py-12 sm:py-16" : "py-8 sm:py-10"}>
        {crumbs && <Breadcrumb items={crumbs} className="mb-5" />}
        {eyebrow && <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">{eyebrow}</div>}
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div className="max-w-3xl">
            <h1 className={cn("font-medium tracking-tight text-accent", size === "lg" ? "text-4xl leading-[1.1] sm:text-5xl" : "text-3xl sm:text-4xl")}>{title}</h1>
            {description && <p className={cn("mt-3 text-muted", size === "lg" ? "text-lg leading-relaxed" : "text-base")}>{description}</p>}
          </div>
          {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
        </div>
      </Container>
    </div>
  );
}

// ----------------------------------------------------------------------------
// Botões e links
// ----------------------------------------------------------------------------

type ButtonVariant = "primary" | "secondary" | "accent" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

const BUTTON_BASE = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-ds border font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:pointer-events-none disabled:opacity-50";
const BUTTON_SIZE: Record<ButtonSize, string> = { sm: "h-9 px-3.5 text-[13px]", md: "h-11 px-5 text-sm", lg: "h-12 px-7 text-[15px]" };
const BUTTON_VARIANT: Record<ButtonVariant, string> = {
  primary: "border-primary bg-primary text-primary-foreground hover:bg-primary-hover hover:border-primary-hover",
  secondary: "border-border-strong bg-white text-foreground hover:border-foreground",
  accent: "border-accent bg-accent text-white hover:bg-accent-dark hover:border-accent-dark",
  ghost: "border-transparent bg-transparent text-foreground hover:bg-surface",
  danger: "border-transparent bg-transparent text-danger hover:bg-brand-soft",
};

export function buttonClass({ variant = "primary", size = "md", className }: { variant?: ButtonVariant; size?: ButtonSize; className?: string }) {
  return cn(BUTTON_BASE, BUTTON_SIZE[size], BUTTON_VARIANT[variant], className);
}

type CommonButtonProps = { variant?: ButtonVariant; size?: ButtonSize; className?: string; children: ReactNode };
type LinkButtonProps = CommonButtonProps & { href: string; external?: boolean };
type NativeButtonProps = CommonButtonProps & Omit<ComponentProps<"button">, "className" | "children">;

/** `href` → link (interno ou externo); sem `href` → <button> (formulários, ações). */
export function Button(props: LinkButtonProps | NativeButtonProps) {
  const { variant, size, className, children } = props;
  const cls = buttonClass({ variant, size, className });
  if ("href" in props) {
    const { href, external } = props;
    if (external || /^https?:|^mailto:|^tel:/.test(href)) return <a href={href} className={cls} target={external ? "_blank" : undefined} rel={external ? "noopener" : undefined}>{children}</a>;
    return <Link href={href} className={cls}>{children}</Link>;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _v, size: _s, className: _c, children: _ch, type = "button", ...rest } = props;
  return <button type={type} className={cls} {...rest}>{children}</button>;
}

/** Link textual na cor de acento (o "Cancelar" vermelho da referência usa variant="danger"). */
export function TextLink({ href, children, className, variant = "accent" }: { href: string; children: ReactNode; className?: string; variant?: "accent" | "danger" | "muted" }) {
  const color = { accent: "text-accent hover:text-accent-dark", danger: "text-danger hover:underline", muted: "text-muted hover:text-foreground" }[variant];
  const cls = cn("inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline", color, className);
  return /^https?:/.test(href) ? <a href={href} className={cls}>{children}</a> : <Link href={href} className={cls}>{children}</Link>;
}

// ----------------------------------------------------------------------------
// Dados em grade: "Rótulo: valor" em 3 colunas (área do cliente, resumo do checkout)
// ----------------------------------------------------------------------------

export function FieldGrid({ children, cols = 3, className }: { children: ReactNode; cols?: 2 | 3 | 4; className?: string }) {
  const grid = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[cols];
  return <dl className={cn("grid gap-x-8 gap-y-3", grid, className)}>{children}</dl>;
}

export function Field({ label, children, className }: { label: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={cn("text-sm leading-relaxed", className)}>
      <dt className="inline text-foreground-2">{label}: </dt>
      <dd className="inline text-muted">{children ?? "—"}</dd>
    </div>
  );
}

// ----------------------------------------------------------------------------
// Badges, listas e preço
// ----------------------------------------------------------------------------

export type BadgeTone = "neutral" | "accent" | "success" | "warning" | "danger";

export function Badge({ children, tone = "neutral", className }: { children: ReactNode; tone?: BadgeTone; className?: string }) {
  const tones: Record<BadgeTone, string> = {
    neutral: "border-border text-muted",
    accent: "border-accent/30 bg-accent-soft text-accent-dark",
    success: "border-success/30 bg-success/10 text-success",
    warning: "border-warning/30 bg-warning/10 text-warning",
    danger: "border-danger/30 bg-danger/10 text-danger",
  };
  return <span className={cn("inline-flex items-center whitespace-nowrap rounded-ds border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider", tones[tone], className)}>{children}</span>;
}

/** Lista de recursos com check na cor de acento. */
export function CheckList({ items, className, dense }: { items: string[]; className?: string; dense?: boolean }) {
  return (
    <ul className={cn("space-y-2 text-sm text-foreground-2", dense && "space-y-1.5", className)}>
      {items.map((it) => (
        <li key={it} className="flex gap-2.5">
          <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
export const formatBRL = (cents: number) => BRL.format(cents / 100);

export function Price({ cents, interval = "mês", contactSales, className }: { cents: number; interval?: string; contactSales?: boolean; className?: string }) {
  if (contactSales) return <div className={cn("text-2xl font-medium tracking-tight", className)}>Sob consulta</div>;
  const [int, dec] = formatBRL(cents).replace("R$", "").trim().split(",");
  return (
    <div className={cn("flex items-baseline", className)}>
      <span className="mr-1 text-sm text-muted">R$</span>
      <span className="text-4xl font-medium tracking-tight">{int}</span>
      <span className="text-base text-muted">,{dec}</span>
      <span className="ml-1 text-sm text-muted">/{interval}</span>
    </div>
  );
}

// ----------------------------------------------------------------------------
// Stepper (checkout): concluído ✓ · atual numerado com acento · pendente cinza
// ----------------------------------------------------------------------------

export function Stepper({ steps, current, className }: { steps: string[]; current: number; className?: string }) {
  return (
    <ol className={cn("grid gap-3 border-b border-border pb-4 sm:grid-cols-3", className)} style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className={cn("flex items-center gap-2.5 text-sm", active ? "text-foreground" : done ? "text-foreground-2" : "text-muted-2")}>
            <span className={cn("grid size-6 shrink-0 place-items-center rounded-full border text-[11px] font-semibold", done && "border-success text-success", active && "border-accent bg-accent text-white", !done && !active && "border-border-strong")}>
              {done ? <Check className="size-3.5" aria-hidden /> : i + 1}
            </span>
            <span className="truncate">{label}</span>
          </li>
        );
      })}
    </ol>
  );
}

// ----------------------------------------------------------------------------
// Cartão plano: sem sombra, borda fina; o plano em destaque ganha borda de acento
// ----------------------------------------------------------------------------

export function Panel({ children, className, highlight, ...rest }: { children: ReactNode; className?: string; highlight?: boolean } & Omit<ComponentProps<"div">, "className" | "children">) {
  return <div className={cn("rounded-ds border bg-white p-6", highlight ? "border-accent ring-1 ring-accent" : "border-border", className)} {...rest}>{children}</div>;
}

/** Aviso discreto (minutas legais, estado vazio, erro de formulário). */
export function Notice({ children, tone = "neutral", className }: { children: ReactNode; tone?: "neutral" | "warning" | "danger" | "success"; className?: string }) {
  const tones = { neutral: "border-border bg-surface text-foreground-2", warning: "border-warning/40 bg-warning/5 text-foreground-2", danger: "border-danger/40 bg-danger/5 text-danger", success: "border-success/40 bg-success/5 text-foreground-2" };
  return <div className={cn("rounded-ds border px-4 py-3 text-sm", tones[tone], className)}>{children}</div>;
}

// ----------------------------------------------------------------------------
// Formulários: input com borda fina, foco na cor de acento, erro abaixo
// ----------------------------------------------------------------------------

export const inputClass = "h-11 w-full rounded-ds border border-border-strong bg-white px-3.5 text-sm text-foreground placeholder:text-muted-2 transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:bg-surface aria-[invalid=true]:border-danger";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(inputClass, className)} {...props} />;
}

export function Select({ className, ...props }: ComponentProps<"select">) {
  return <select className={cn(inputClass, "pr-9", className)} {...props} />;
}

/** Rótulo + campo + ajuda/erro. `error` vem do fieldErrors da action. */
export function FormField({ label, htmlFor, error, help, children, className }: { label: ReactNode; htmlFor?: string; error?: string[] | string | null; help?: ReactNode; children: ReactNode; className?: string }) {
  const msg = Array.isArray(error) ? error[0] : error;
  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-foreground-2">{label}</label>
      {children}
      {msg ? <p className="text-xs text-danger">{msg}</p> : help ? <p className="text-xs text-muted">{help}</p> : null}
    </div>
  );
}

/** Tabela simples: cabeçalho discreto, linhas separadas por regra fina. */
export function Table({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-x-auto rounded-ds border border-border", className)}>
      <table className="w-full text-sm [&_tbody_tr]:border-t [&_tbody_tr]:border-border [&_td]:px-4 [&_td]:py-3 [&_th]:bg-surface [&_th]:px-4 [&_th]:py-2.5 [&_th]:text-left [&_th]:text-xs [&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-wider [&_th]:text-muted">{children}</table>
    </div>
  );
}
