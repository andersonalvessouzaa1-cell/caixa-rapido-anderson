# Caixa Rápido Anderson — Google

Conta autorizada: anderson.alves.souzaa1@gmail.com. O botão “Entrar com Google” carrega a planilha privada dessa conta; as bases locais e de demonstração continuam separadas.

Depois de confirmar um lançamento, aguarde o status “Confirmado no Google”. “Salvo no navegador / sincronizando” ou “Pendente” não confirma gravação remota. Se houver pendência, mantenha a página aberta, use “Sincronizar agora” e baixe backup antes de sair. A conexão é renovada por clique quando a sessão do Google expira; não armazenamos access token ou client secret no navegador.

A planilha contém Lançamentos (visualização) e _historico (revisões completas do aplicativo). Use o aplicativo para editar; alterações manuais na aba Lançamentos não são importadas automaticamente. Não altere _historico. Todas as revisões são preservadas; a leitura usa a cadeia de revisões, não a posição física das linhas.

Use um aparelho por vez. Se outro aparelho alterar a versão antes de um salvamento, o aplicativo interrompe a sincronização e mantém o backup local. Conflitos simultâneos precisam de revisão; não há fusão automática de versões. A implementação impõe limites de tamanho de histórico para evitar falhas silenciosas.

Configuração Google em modo de teste, liberada somente para Anderson. Luana não foi configurada, conforme a última instrução. A hospedagem continua privada pelo ChatGPT; essa proteção é separada da autorização Google.

Escopos: openid, email e drive.file (arquivos criados/autorizados para o aplicativo). APIs Drive e Sheets ativadas no projeto caixa-rapido-514502. Client ID é público; client secret não é usado nem incluído no código.
