# Reutilização segura do Caixa Rápido

Este repositório é a instalação de referência do Anderson. Cada nova pessoa deve receber uma instalação separada.

## Checklist de nova instalação

1. Crie diretório ou repositório independente; não misture os arquivos de Luana, Anderson ou outra pessoa.
2. Preserve o domínio financeiro e os testes; personalize somente a identidade visual e textos aprovados para aquela pessoa.
3. Gere OAuth Client ID próprio para a nova origem. Nunca copie o Client ID, e-mail permitido ou projeto Google do Anderson.
4. Use `shared/google-config.example.js` como formato e configure localmente `shared/google-config.js`. Este último não deve conter segredo, mas é vinculado a uma conta e origem específicas.
5. Crie uma planilha privada para a instalação. Não reutilize nem compartilhe a planilha do Anderson.
6. Mantenha `drive.file`, tokens apenas em memória, confirmação visível após a gravação, histórico imutável e conflito sem sobrescrita silenciosa.
7. Configure origens OAuth exatas para localhost e hospedagem escolhida. Verifique domínio, HTTPS, audiência da hospedagem e estado de publicação antes de distribuir.
8. Execute os testes e o build, depois valide login, gravação, leitura, desfazer, recarga e backup com dados sintéticos.
9. Nunca inserir dados financeiros reais em testes, fixtures, screenshots ou commits.

## Limites conhecidos

A implementação desta base exige uso sequencial em um aparelho para a mesma conta. Não há fusão automática de edições concorrentes entre dispositivos. A planilha e a integração dependem de consentimento e configuração Google de cada instalação.
