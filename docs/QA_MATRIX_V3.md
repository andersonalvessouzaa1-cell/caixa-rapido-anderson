# QA Matrix HUD V3 — 12/11/2026

## Escopo concluído

- Build `node build.cjs` e suíte `npm test` aprovados; módulos anual e investimentos com testes de regressão e migração opcional.
- Chromium renderizado em 12 larguras (320–1920), 9 telas cada: sem erro de JavaScript nem rolagem horizontal.
- Formulário investimento (R$1.500,00 e 8,50%), persistência local, remoção e filtro anual validados em sandbox. Os dados dos testes não foram enviados a servidor.
- Animação decorativa pausada em mobile/reduced-motion, canvas limitado a desktop; sem bibliotecas 3D pesadas.

## Pendente no ambiente real

- Login OAuth na conta real, Google Sheets e verificação de histórico e confirmação de escrita.
- Teste do build **ao vivo**, inclusive CSP/origens Google e sincronização após publicação.
- Verificação manual WCAG AA completa e navegação com leitores de tela.
- Deploy no projeto privado ChatGPT Sites: não há manifest `.openai/hosting.json` nem pipeline GitHub Actions neste repositório. GitHub push não configura a publicação deste site.

## Rollback

- Backup GitHub antes da atualização.
- Restaurar o commit anterior em GitHub caso necessário, sem force push; restaurar o código no Sites separadamente.
- Preservar os dados financeiros e baixar JSON antes de trocar o Site. Rollback de código não reverte dados Google Sheets.
