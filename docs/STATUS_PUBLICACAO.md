# Estado da instalação Anderson

Atualizado em 12/11/2026. Este documento descreve somente a instalação pessoal do Anderson.

- Hospedagem: https://caixa-rapido-anderson.anderson-alves-souza.chatgpt.site
- Acesso à hospedagem: privado, protegido pela conta ChatGPT do proprietário.
- Google: OAuth em modo de teste, somente a conta configurada em `shared/google-config.js`.
- APIs usadas: Drive e Sheets, com escopo `drive.file`.
- Persistência: planilha privada do proprietário; revisões append-only em `_historico`, aba `Lançamentos` como visualização.
- Credenciais: não há client secret ou token armazenado no código. O Client ID do navegador é público e configurado em `shared/google-config.js`.
- Verificação real: autorização, criação/leitura da planilha, gravação, confirmação e desfazer com lançamento sintético foram concluídos; o lançamento de teste foi desfeito.

Limites: a publicação continua privada pelo ChatGPT; autorização Google não abre o acesso público. OAuth está em modo de teste e não é cadastro comercial geral. Uma pessoa/aparelho por vez para esta instalação; sem mesclagem simultânea automática. Mantenha backups e espere “Confirmado no Google”.

Não inclua exports da planilha, dados financeiros, access tokens, client secrets, dumps do navegador ou arquivos de perfil Google em commits.

## Atualização Matrix HUD V3 (12/11/2026)

Código atualizado com tema intercambiável, despesas anuais e carteira manual opcional. `npm test` e `npm run build` passaram; a QA local usa dados fictícios ou isolados e não substitui autenticação/sincronização real. **GitHub não é um deploy automático do ChatGPT Sites.** Confirmar publicação pela interface do Site e validar a versão/conta real antes de declarar lançamento concluído.
