# Aliquantum Suzuki — site 2026

Site da concessionária Suzuki da Aliquantum (Vila Graciosa, São Paulo).
HTML/CSS/JS estáticos, sem build e sem dependências: `index.html`, `styles.css`, `main.js`.

**No ar:** <https://hctoliv.github.io/aliquantum-suzuki/>
Publicado pelo GitHub Pages a partir da branch `main` (raiz). Todo push na `main`
republica o site em cerca de um minuto.

> Ao mexer em `styles.css` ou `main.js`, **suba o `?v=` nos dois links do
> `index.html`**. O Pages serve os arquivos com `max-age=600`, então sem isso quem
> já visitou continua vendo a versão antiga por até dez minutos.

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

## Identidade de marca

Extraída do perfil **@aliquantumsuzuki**, não inventada. As cores foram amostradas
pixel a pixel do logo do perfil:

| Token | Valor | Origem |
|---|---|---|
| `--az` | `#3A4AC2` | azul royal do badge circular (amostrado: `#4050B8`) |
| `--lima` | `#C8D935` | amarelo-limão do anel e dos títulos de impacto |
| `--ink` | `#070A16` | preto puxado para o azul, como o showroom das fotos deles |
| `--verm` | `#DE0039` | vermelho da Suzuki, extraído do SVG oficial da marca |

- **Logo:** badge circular azul com anel limão, reconstruído em SVG (header, rodapé e favicon).
- **Tipografia:** Barlow Condensed 700/800, caixa alta, com a palavra de impacto em
  **itálico limão** — é o recurso que se repete em todas as artes do Instagram
  ("DIA DO **VENDEDOR**", "A ESCOLHA **CERTA**").
- **Vermelho:** é o da própria Suzuki (`#DE0039`, lido do SVG oficial do logotipo),
  e entra com papel definido — **ação e urgência**, nunca decoração:
  botão "Falar agora", "Agendar test ride", o envio do formulário, a faixa de troca,
  o filtro ativo, o selo **0 km** dos cards e o friso lateral do card do hero.

**As três cores têm função, não são enfeite:** azul estrutura, limão sinaliza
(olho de seção, ícones, a palavra em itálico), vermelho manda agir.

O que **não** veio do Instagram foi o layout. As artes de feed são promocionais
(contorno, brilho, selo de preço); aqui a mesma paleta é aplicada com o respiro
editorial das referências Avantgarde e Porsche. Identidade é cor, logo e atitude
tipográfica — não diagramação de post.

## Estrutura

1. **Hero** — foto de estrada com o texto à esquerda e a barra do modelo em destaque
   logo abaixo dele, rotacionando (Hayabusa → V-Strom 1050 → GSX-8R). A barra é
   horizontal de propósito: na versão em card vertical ela cobria a moto da foto.
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
- **Do Instagram:** desde 2008 (18 anos), +150 motos em estoque, quatro marcas
  representadas (Suzuki, Haojue, Zontes, Kymco).

> **Atenção — dois WhatsApps diferentes.** O site oficial publica
> **(11) 99269-8532**; a bio do Instagram publica **(11) 97853-6591**. O site usa o
> primeiro. Confirme qual é o número que a equipe de vendas atende antes de publicar,
> porque é por ele que todo o funil passa.

> Preço de moto muda. Antes de publicar, vale uma passada de olho na seção
> `#modelos` do `index.html` — os valores estão no HTML, um por card.

## Conferência das fotos — regra da casa

**Nenhuma foto é pareada a um modelo sem que a identificação seja inequívoca.**
Cada imagem de banner foi ampliada no decalque da carenagem antes de entrar:

| Foto | Como foi confirmada | Modelo |
|---|---|---|
| `hero-hayabusa.jpg` | kanji 隼 na carenagem + veio da página `/hayabusa` | Hayabusa |
| `hero-vstrom-1050de.jpg` | decalque lê **V-STROM 1050DE**; rodas raiadas batem com o card | V-Strom 1050**DE** |
| `hero-gsx-s1000gt.jpg` | decalque **GT** + malas laterais + carenagem | GSX-S1000GT |

> O 1050DE quase virou erro: a foto estava para ser usada no slide "V-Strom 1050",
> que é outra moto (roda fundida, R$ 77.600 contra R$ 81.650). O decalque resolveu.

Os 11 cards foram conferidos do mesmo jeito — cada um veio da pasta `cores/` da
própria página do modelo no site da Suzuki, e os pares que mais se confundem
(8R carenada × 8S naked; S1000 naked × GT carenada × GX crossover; 1050 × 1050DE)
foram vistos um a um.

**O rodízio do hero só tem três modelos** porque são os três com foto ambientada
oficial e identificação inequívoca. GSX-8R e V-Strom 1050 saíram do rodízio por
falta de foto confirmada — continuam nos cards, com a foto de estúdio deles.
Para entrar um quarto, confirme o decalque antes.

## Imagens

Todas oficiais da Suzuki Motos do Brasil, baixadas de `suzukimotos.com.br`:

- `assets/hero-*.jpg` — os três fundos do rodízio. Trocam junto com o card do modelo
  em destaque: uma camada `<img>` fixa por modelo, alternando só a opacidade.

**O enquadramento não foi no olho.** Mediu-se a faixa que a moto ocupa em cada
arquivo e calculou-se o `object-position` que a deixa inteira e à direita do texto.
No desktop (1440px) a moto cai em 632–1423, 522–1222 e 844–1359, com o texto
terminando em 692 — ou seja, as três ficam livres da coluna de texto.

`object-position` menor empurra a imagem para a **direita** (alinha a borda
esquerda). É contraintuitivo e já causou confusão aqui: o V-Strom usa `0% 50%`
justamente para jogar a moto para a direita.

A Hayabusa é foto de estúdio recortada, então no desktop usa `.hero__media--palco`:
a imagem recebe a largura da própria proporção, encosta na direita e tem a borda
esquerda dissolvida por um `mask`, sem emenda contra o palco escuro.
- `assets/hayabusa.jpg` — recorte do banner oficial, com o texto da Suzuki removido
- `assets/motos/*.jpg` — os 11 modelos, mesmo ângulo e enquadramento, fundo branco
  que o CSS funde com `mix-blend-mode: multiply`

Total de ~2 MB para 15 imagens. Trocar por **fotos da loja real** continua sendo o
maior salto de qualidade possível — catálogo todo mundo tem.

## O hero no celular

A foto não preenche a altura toda: vira uma **faixa de 52svh no topo**, em formato
paisagem, e a barra do modelo sobe para logo abaixo dela (`order: -1`).

Por quê: com a foto preenchendo os ~900px de altura do hero, só aparecia metade da
moto (47%, 53% e 72% nas três). Na faixa, aparecem **100% nas três**, e a barra que
nomeia a foto cabe na primeira tela (120–402px de 812).

## O que falta antes de publicar

1. **Confirmar o WhatsApp** (veja o aviso acima).
2. **Fotos próprias** do showroom, da equipe e do estoque, substituindo as de catálogo.
3. **Domínio.** O `canonical` e o schema apontam para `aliquantumsuzuki.com.br`.
   Enquanto o site vive só no Pages isso é até conveniente — o canonical para um
   domínio que ainda não existe mantém a versão de demonstração fora do índice do
   Google. Ao publicar no domínio real, troque nos dois lugares (`<link rel="canonical">`
   e o bloco JSON-LD) e aponte o CNAME.
4. **Checar preços e versões** com o gerente de vendas.
5. **Analytics**, se for o caso (nada foi incluído — o site não carrega um byte
   de terceiros além da fonte do Google).

## Decisões técnicas

- **Zero framework.** ~80 KB de código + 1,5 MB de imagens, uma requisição de fonte, nenhum script externo.
- **Fontes** Barlow Condensed (títulos) + Inter Tight (texto e números), sem bloquear o render.
- **Acessibilidade** skip link, foco visível, `aria-pressed` nos filtros, `aria-expanded`
  no menu, contraste AA, formulário com labels reais.
- **`prefers-reduced-motion`** desliga reveal, contadores, rotação do hero e transições.
- **Sem imagem? Sem buraco.** Todo `<img>` de arte tem `onerror` que se remove e
  deixa o fundo desenhado em CSS aparecer.
- **SEO** JSON-LD de `MotorcycleDealer` com endereço, horários e redes.

## Paleta

| Token | Valor | Uso |
|---|---|---|
| `--ink` | `#070A16` | base escura |
| `--ink-2` | `#0C1122` | seções escuras alternadas |
| `--paper` / `--paper-2` | `#FFFFFF` / `#F2F3F0` | seções claras |
| `--az` | `#3A4AC2` | azul do logo: estrutura, links, botões secundários |
| `--lima` | `#C8D935` | sinalização: kickers, ícones, itálico de impacto |
| `--verm` | `#DE0039` | ação: CTAs principais, selo 0 km, filtro ativo |
