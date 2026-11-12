# Caixa Rápido — Anderson

Aplicação pessoal de controle financeiro, com visual aprovado, captura rápida, histórico, categorias e orçamentos, previsões, relatórios e integração Google Drive/Sheets. Este repositório privado guarda a implementação Anderson como referência reutilizável para futuras instalações personalizadas.

## Estado desta versão

- A aplicação publicada do Anderson usa este mesmo código-base; o projeto mantém hospedagem privada do proprietário.
- A conta Google autorizada é configurada no arquivo `shared/google-config.js`. Esse arquivo contém somente o Client ID público e o endereço de conta permitido; não há client secret no navegador nem no repositório.
- Os dados financeiros ficam na planilha privada do proprietário e não foram copiados para este repositório.
- O tema aprovado é escuro com acentos violeta; o verde Matrix aparece somente na assinatura discreta `Rudeboybrdev`.
- A demonstração/local e a conta Google são isoladas. Em caso de sincronização, aguarde o estado **“Confirmado no Google”** antes de fechar a página.

## Começar localmente

Requer Node.js 18 ou superior. Não há dependências npm de runtime.

```bash
npm test
npm run build
npm start
```

O servidor local padrão usa `http://localhost:5200`. O build gera `dist/`. Os arquivos de dados do navegador não são armazenados no diretório do repositório.

## Estrutura

- `src/` — interface, estilos e adaptador de domínio.
- `shared/` — regras financeiras, persistência local, histórico e integração Google.
- `tests/` — testes do núcleo, adaptadores, armazenamento, histórico e cliente Google simulado.
- `approved/` — captura HTML congelada do design aprovado.
- `docs/BLUEPRINT_MESTRE_CAIXA_RAPIDO_WEB.md` — especificação mestre; a atualização 4.7 no início reflete o estado mais recente e prevalece sobre notas históricas.
- `docs/GOOGLE_USO.md` — limites e operação da sincronização desta instalação.
- `docs/REUSO_INSTALACOES.md` — checklist para criar outras instalações isoladas.
- `docs/GUIA_PREVENCAO_TRAVAMENTOS_IA.md` — lições para reduzir repetição e alegações sem evidência em agentes de código.

## Reutilizar em outra instalação

Leia `docs/REUSO_INSTALACOES.md` antes de clonar como produto de outra pessoa. Crie configuração OAuth, planilha, instalação e armazenamento separados para cada proprietário. Nunca reutilize a configuração Google do Anderson. Use `shared/google-config.example.js` como modelo e substitua os valores conforme a nova instalação. A cópia ainda exige configurar origens OAuth e hospedagem.

## Google e segurança

A integração usa Google Identity Services e o escopo limitado `drive.file`; o token permanece apenas em memória. A sincronização mantém revisões no histórico privado da planilha e detecta conflito em vez de sobrescrever silenciosamente. Use um aparelho por vez: não há mesclagem automática simultânea. Alterações manuais na aba de visualização não são importadas. Mantenha backups.

O repositório é privado e não deve ser tornado público com a configuração atual, pois inclui detalhes da conta Google autorizada. Mesmo sendo privado, nunca adicione client secrets, tokens, backups financeiros ou dados reais de transações.
