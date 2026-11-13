# Caixa Rápido — Matrix HUD 3D (Anderson)

Aplicação privada de controle financeiro pessoal com captura por texto, histórico, categorias, orçamentos mensais, contas previstas, relatórios, **mapa anual de despesas por nicho** e **carteira de investimentos com retornos informados manualmente**. A camada visual Matrix 3D é intercambiável com outros temas; o núcleo financeiro não depende de efeitos visuais.

## Funcionalidades

- **Captura rápida:** texto natural, interpretação de valor/data/tipo/categoria, revisão e confirmação; formulário manual alternativo.
- **Histórico:** edição, desfazer/restaurar, filtros e exportação CSV protegida contra células maliciosas.
- **Recorrências:** mês correto, previsão independente dos valores realizados, desfeitos restauram a previsão.
- **Orçamentos e relatórios:** limites por mês, alertas locais, gráficos financeiros e categorias.
- **Gastos anuais:** YTD total, participação (%) de `Salão/Beleza`, `Internet/Assinaturas`, `Mercado/Alimentação`, `Serviços`, `Outros`; donut com profundidade, barras mensais e filtros por nicho/mês. Serviços recorrentes são inferidos por descrições repetidas em **meses diferentes**, não por cadastro de estabelecimento.
- **Investimentos:** posições de Renda Fixa, Ações, FIIs, Cripto, Tesouro Direto e Reserva; adicionar, editar, remover; valor investido em centavos, retorno percentual **acumulado informado**, patrimônio estimado e alocação por classe. Nenhuma cotação em tempo real.
- **Persistência:** bases pessoais, de demonstração e Google mantidas separadas; backups JSON, histórico de revisões Google e proteção contra conflito.
- **UX Matrix:** CSS 3D, fundo de chuva digital de baixa opacidade, botões táteis, painéis HUD, foco visível, redução de movimento e fallback estático no mobile. Sem dependência Three.js/WebGL.

## Tecnologias

HTML5, CSS3, JavaScript puro, Node.js 18+, Google Identity Services (OAuth) e Google Sheets/Drive. Não há dependências npm em runtime. Gráficos renderizados com CSS e SVG; canvas decorativo limitado à tela desktop e pausado quando oculto.

## Começar

```bash
npm test
npm run build
npm start
```

Servidor local em `http://localhost:5200`. O build gera `dist/`, contendo `index.html`, `app.js`, `domain.js`, pastas de tema/componentes/módulos e `shared/`. **Nunca publique a pasta de código-fonte sem revisar o acesso à conta Google configurada.**

## Arquitetura

```text
src/
  index.html          composição e carregamento dos módulos
  app.js              fluxos existentes, roteamento das telas e ações
  domain.js           adaptador legado / centavos do núcleo
  components/
    widgets.js        widgets anuais e investimentos (renderizadores puros)
    hud.js            chuva digital e perspectiva, sem dados financeiros
  modules/
    annual.js         classificação, filtro YTD, participação e repetição
    investments.js    validação e projeções de patrimônio
  theme/
    tokens.css        variáveis de cor, tipo, spacing e bordas para reskin
    matrix.css        skin Matrix (HUD, 3D, layout)
  utils/
    format.js         moeda, percentuais e escape de HTML
  styles.css          elementos e componentes base independentes do tema
shared/
  core.js             validação, parsing, valores e backups
  local.js            persistência por instalação e modo
  history.js          histórico append-only, versão corrente
  google.js           OAuth, sincronia e projeção em Sheets
  google-config.js    configuração específica da conta atual (privada)
tests/                 testes do negócio, armazenamento, regressões, UI
```

### Modelo de dados

O estado canônico mantém `txs[]`, `recs[]`, `budgets`, `budgetMonths`, `customRules`, `alerts` e o novo campo **opcional** `investments[]`:

```json
{"id":"inv_001","kind":"Renda Fixa","name":"CDB Exemplo","invested":100001,"returnBps":825}
```

`invested` está em **centavos**; `returnBps=825` corresponde a um retorno acumulado informado de **8,25%**. O valor atual estimado é `round(invested * (1 + returnBps / 10000))`, com piso zero. Alocação é calculada com valores atuais estimados, não com aportes originais. O estado antigo, sem `investments`, continua legível; o próximo salvamento inclui `investments:[]`. Backups v1 ainda podem ser restaurados, e a nova coleção entra nas revisões de `_historico` sem precisar criar uma aba de planilha. A aba `Lançamentos` continua sendo apenas uma projeção das movimentações, e não um espelho da carteira.

**Regras importantes:** compra de ativo não vira automaticamente despesa de consumo; entradas e saídas previstas/desfeitas não entram em YTD. Categorias são classificadas por heurística em `src/modules/annual.js`; revise palavras-chave da instalação. Não há integração com corretoras nem atualização de preços.

## Trocar o tema de clones futuros

1. Edite somente `src/theme/tokens.css` para alterar a paleta, fontes, raio, espaçamento e sombras.
2. Substitua `src/theme/matrix.css` por outro arquivo de skin (e ajuste a referência em `src/index.html`); `src/styles.css` contém padrões funcionais e legíveis.
3. Troque `window.CaixaConfig.displayName`, título, metadados e assinatura na entrada. Adapte os textos de `src/app.js` para o produto de destino.
4. Para instalações diferentes, **configure uma nova conta/Client ID/origens autorizadas, ID de instalação, planilha e dados** em `shared/google-config.js` + `window.INSTALLATION_ID`. Nunca compartilhe a planilha pessoal do Anderson.
5. Execute `npm test`, `npm run build`, o roteiro de QA mobile e teste a integração Google na conta de destino antes de liberar.

**Não mova regras, históricos ou integrações para o tema.** `shared/` e `src/modules/` são independentes da skin.

## Testes e desempenho

`npm test` cobre parsing, backup, histórico, persistência, Google simulado, recorrências, classificação anual, retorno e validação de carteira. `npm run build` verifica sintaxe e empacota os arquivos. Foi testada a navegação em Chromium nas larguras 320, 360, 390, 480, 620, 768, 799, 800, 1024, 1280, 1440 e 1920 pixels, incluindo gravação/remoção local de posição, filtros e ausência de overflow horizontal. Essa bateria não substitui testes reais de OAuth, Google Sheets, leitores de tela ou dispositivos físicos. FPS depende do dispositivo; o render visual usa CSS/SVG e chuva digital com atualização reduzida.

## Segurança, privacidade e deploy

O repositório é **privado**. Não comite tokens, client secrets, backups reais, dumps da planilha ou dados pessoais. OAuth roda apenas com a conta permitida; a persistência local é separada da sincronização. Aguarde **“Confirmado no Google”** após alterações.

**GitHub não publica automaticamente este site.** O endereço privado `chatgpt.site` é gerenciado pelo ChatGPT Sites e requer abrir o Site correspondente, salvar a versão e clicar em **Deploy**. O ZIP gerado pelo build pode ser entregue ao fluxo de publicação, mas somente quando o proprietário puder verificar o vínculo com o Site atual. Não substitua dados em produção sem backup anterior.

Consulte `docs/STATUS_PUBLICACAO.md`, `docs/REUSO_INSTALACOES.md` e `docs/GOOGLE_USO.md` para os requisitos específicos desta instalação.


## Hero Clean e navegação (12/11/2026)

A tela inicial não contém mais o globo 3D. A sidebar pode recolher no desktop e abrir no celular; o painel de conexão Google foi integrado à coluna principal. Em Ajustes, Limpar Tudo exige confirmação e backup local verificável e Restaurar Dados (Desfazer) recupera o último backup desta base. A limpeza em modo Google também pode sincronizar exclusões: salve backup JSON e confira a conta.
