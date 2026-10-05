# Aliquantum Suzuki — site 2026

Site da concessionária Suzuki da Aliquantum (Vila Graciosa, São Paulo).
HTML/CSS/JS estáticos, sem build e sem dependências: `index.html`, `styles.css`, `main.js`.

**No ar:** <https://hctoliv.github.io/aliquantum-suzuki/>
Publicado pelo GitHub Pages a partir da branch `main` (raiz). Todo push na `main`
republica o site em cerca de um minuto.

```bash
python3 -m http.server 4178
```

Depois abra <http://127.0.0.1:4178>.

---

## A tese do site

O site atual da Aliquantum é um **portal de estoque multimarcas**: a primeira coisa
que ele pede é que você escolha uma marca entre dezesseis. Isso serve ao grupo, mas
não serve à operação Suzuki — que é autorizada, tem oficina, consórcio e uma linha
0 km inteira para defender.

Este site inverte: **a Suzuki é a protagonista** e o estoque multimarcas vira um link.
As duas referências entraram por motivos diferentes:

| Referência | O que foi aproveitado |
|---|---|
| **Avantgarde** | Respiro editorial, tipografia display com tracking negativo, grades de 1px, seções claras alternando com escuras, scroll reveal discreto |
| **Porsche dealer (bexp)** | Hero cinematográfico com modelo em destaque + **barra de ações rápidas logo abaixo** (telefone, WhatsApp, rota, agendamento, e-mail) — o padrão que concessionária precisa e vitrine de luxo não tem |

A diferença entre os dois: a Avantgarde vende desejo, a Porsche vende atendimento.
Concessionária autorizada vive das duas coisas, então o site alterna entre o registro
editorial (Hayabusa, linha 2026) e o operacional (oficina, agendamento, rota).

## Estrutura

1. **Hero** — palco escuro com card de modelo em destaque que rotaciona (Hayabusa → V-Strom 1050 → GSX-8R)
2. **Ações rápidas** — telefone, WhatsApp, como chegar, agendar revisão, e-mail
3. **Linha 2026** — 11 configurações com filtro por categoria + tile de CTA
4. **Hayabusa** — o destaque editorial, com ficha técnica
5. **Serviços** — oficina, peças, financiamento, consórcio, avaliação, entrega técnica
6. **A concessionária** — números com contador animado
7. **Depoimentos** — avaliações reais, vindas do site atual
8. **Agendamento** — o funil (abaixo)
9. **Localização** — endereço, horários, rota
10. **Faixa de troca** + rodapé

## O funil

O formulário **não envia nada**: ele monta a mensagem e abre o WhatsApp da loja
(11 99269-8532) com tudo preenchido — nome, modelo, assunto, período e observação.

Por quê: concessionária responde por WhatsApp, não por e-mail. Um formulário que
gera lead em inbox morre no sábado à tarde; uma conversa já aberta, não. Também
elimina backend, LGPD de armazenamento e custo de hospedagem — os dados nunca
saem do aparelho do visitante.

Os botões `→` de cada modelo e o link da Hayabusa pré-selecionam o modelo no
formulário antes de rolar até ele.

## Dados reais usados

Tudo conferido em 05/10/2026, no site da Aliquantum e no site oficial da Suzuki Motos:

- **Endereço** Av. Prof. Luiz Ignácio Anhaia Mello, 4385 — Vila Graciosa, São Paulo/SP, 03295-000
- **Telefone** (11) 2024-7000 · **WhatsApp** (11) 99269-8532 · **E-mail** vendas@aliquantum.com.br
- **Horários** Seg–Sex 9h–18h · Sáb 9h–17h
- **CNPJ** 23.511.794/0001-53 · **Instagram** @aliquantumsuzuki
- **Preços** os 11 modelos usam o preço público sugerido da Suzuki, batendo com o
  que está no estoque da própria Aliquantum. Hayabusa R$ 124.500 → GSX-8S R$ 51.500.

> Preço de moto muda. Antes de publicar, vale uma passada de olho na seção
> `#modelos` do `index.html` — os valores estão no HTML, um por card.

## O que falta antes de publicar

1. **Fotos.** Veja `assets/README.md`. O site funciona sem elas (cai para o palco
   gráfico e para placeholders tipográficos), mas é a maior diferença entre
   "bonito" e "caro". Foto da loja real vale mais que foto de catálogo.
2. **Domínio.** O `canonical` e o schema apontam para `aliquantumsuzuki.com.br`.
   Enquanto o site vive só no Pages isso é até conveniente — o canonical para um
   domínio que ainda não existe mantém a versão de demonstração fora do índice do
   Google. Ao publicar no domínio real, troque nos dois lugares (`<link rel="canonical">`
   e o bloco JSON-LD) e aponte o CNAME.
3. **Checar preços e versões** com o gerente de vendas.
4. **Analytics**, se for o caso (nada foi incluído — o site não carrega um byte
   de terceiros além da fonte do Google).

## Decisões técnicas

- **Zero framework.** ~78 KB de código, uma requisição de fonte, nenhum script externo.
- **Fontes** Archivo (display) + Inter Tight (texto), carregadas sem bloquear o render.
- **Acessibilidade** skip link, foco visível, `aria-pressed` nos filtros, `aria-expanded`
  no menu, contraste AA, formulário com labels reais.
- **`prefers-reduced-motion`** desliga reveal, contadores, rotação do hero e transições.
- **Sem imagem? Sem buraco.** Todo `<img>` de arte tem `onerror` que se remove e
  deixa o fundo desenhado em CSS aparecer.
- **SEO** JSON-LD de `MotorcycleDealer` com endereço, horários e redes.

## Paleta

| Token | Valor | Uso |
|---|---|---|
| `--ink` | `#0A0B0D` | base escura |
| `--ink-2` | `#101217` | seções escuras alternadas |
| `--paper` / `--paper-2` | `#FFFFFF` / `#F2F2F0` | seções claras |
| `--blue` | `#0046B4` | marca, CTAs |
| `--blue-300` | `#5FA8FF` | acento sobre escuro |
