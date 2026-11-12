# Caixa Rápido Web — Registro de travamentos e guia para próximas criações

Data: 09/11/2026. Registro baseado nas imagens e no texto enviados pelo proprietário. Não houve inspeção dos logs do Chatbox, do provedor ou dos arquivos do projeto externo.

## 1. Objetivo

Evitar repetir tentativas que já falharam e reduzir o retrabalho ao usar a mesma IA no Chatbox. Este guia acompanha o BLUEPRINT_MESTRE_CAIXA_RAPIDO_WEB.md; não substitui suas regras financeiras ou fases.

## 2. O que foi observado

### Ocorrência A — Repetição durante ferramentas

- Aplicativo visível: Chatbox, em modo de trabalho, com “Free Models Router” selecionado.
- A IA apresentou ações de escrita e edição de arquivos.
- Uma ação mostrou o caminho `/home/anderson/caixa-rapido-web/src/domain/entities.ts`.
- Depois surgiram ações de escrita ainda em execução e uma resposta com repetição extensa de `toolresult`.
- A interface continuava indicando atividade; não havia entrega útil concluída.
- Isso não comprova que todas as escritas terminaram, nem que os arquivos foram salvos corretamente.

### Ocorrência B — Corrupção da resposta de planejamento

Após orientação para executar somente F0, foi recebida uma análise que começava compreensível e se degradava em frases sem sentido, mistura de idiomas e caracteres.

Exemplos curtos observados: “Homicídios monetários” e “decisão nuclearólogo”. Não são requisitos do projeto e devem ser descartados.

A resposta também modificou o roadmap original e colocou parser, exportação, offline e PWA dentro da descrição da primeira fase visual, sem manter claramente a separação entre demonstração e implementação real.

### Conclusão limitada às evidências

Houve duas formas de saída inutilizável: repetição de marcadores de ferramenta e degradação de linguagem. A causa técnica continua desconhecida. Não foi comprovado defeito no blueprint, na ferramenta de escrita, no modelo, no roteador ou no provedor.

## 3. O que não repetir

- Não deixar uma sequência evidente de `toolresult` continuar indefinidamente esperando que se resolva.
- Não aprovar análise com trechos incoerentes, mesmo que o início pareça correto.
- Não continuar a implementação numa conversa já contaminada pela saída corrompida.
- Não pedir aplicação inteira, integração Google e design em uma única rodada.
- Não reenviar repetidamente a mesma tarefa sem conferir o que já foi escrito.
- Não tratar mensagem “Escrever ficheiro” como prova de arquivo completo.
- Não apagar o projeto ou recriá-lo por cima antes de inventariar os arquivos.
- Não inventar causas ou ajustar temperatura, contexto e outros parâmetros como se o diagnóstico estivesse confirmado.

## 4. Procedimento recomendado para a próxima tentativa

1. Manter este guia e o blueprint mestre disponíveis como arquivos.
2. Abrir conversa nova, sem colar a resposta corrompida inteira no contexto de trabalho.
3. Registrar modelo/provedor selecionado. Quando possível, escolher modelo específico com suporte declarado às ferramentas necessárias. O roteador usado na ocorrência é um dado de contexto, não uma causa comprovada.
4. Executar primeiro uma leitura curta, sem ferramentas de escrita, usando o prompt A.
5. Validar português coerente, respeito à fase e reconhecimento dos limites.
6. Se já houver projeto, executar inventário somente de leitura usando o prompt B.
7. Só então autorizar F1 com escopo delimitado, usando o prompt C.
8. Ao final de cada rodada, exigir resumo curto: o que mudou, como verificou e o que falta.
9. Guardar ponto de retomada fora da conversa. Não depender de a IA lembrar do chat anterior.

Esse procedimento é uma proposta de prevenção; ainda não há evidência de que tenha eliminado a falha neste ambiente.

## 5. Prompts de retomada

### Prompt A — Verificação inicial de compreensão

> Leia o blueprint mestre anexado. Nesta rodada, não escreva, altere ou apague arquivos. Responda em português em até 300 palavras: objetivo do produto, entrega exata da F1, ações proibidas antes da aprovação visual e informações que não conseguiu verificar. Preserve o roadmap F0–F10. Não transcreva o documento inteiro. Termine e aguarde.

### Prompt B — Inventário do projeto existente

> Inspecione somente em leitura o projeto em /home/anderson/caixa-rapido-web. Não crie esse diretório se não existir. Liste estrutura, arquivos existentes, sinais de arquivos incompletos e diferenças relevantes em relação ao blueprint. Não presuma que escritas da conversa anterior foram concluídas. Não instale dependências, execute aplicação, altere ou apague arquivos. Responda em até 500 palavras e proponha o menor próximo passo verificável.

### Prompt C — Primeiro lote visual

> Após o inventário, execute somente um lote delimitado da F1: landing e estrutura visual do painel, usando dados fictícios identificados. Respeite o tema sofisticado e a assinatura exata Rudeboybrdev. Não implemente Google, parser real, gravação, fila offline ou pagamentos. Apresente antes a lista curta dos arquivos que pretende alterar; este pedido autoriza as alterações reversíveis necessárias a esse lote. Ao terminar, mostre o resultado e informe o que foi realmente verificado. Pare antes do próximo lote. A F1 só estará concluída quando todas as telas e estados exigidos pelo blueprint forem apresentados e aprovados.

### Prompt D — Interromper e recuperar

> A saída entrou em repetição ou perdeu coerência. Interrompa novas ações. Não reenvie operações de escrita sem verificar o resultado anterior. Se conseguir responder normalmente, informe apenas a última ação confirmada e os arquivos cuja conclusão não conseguiu verificar. Não tente corrigir a situação apagando arquivos ou reiniciando a implementação inteira.

Se o aplicativo continuar gerando sem responder, usar o botão de parar. Se não funcionar, fechar e reabrir o aplicativo. Depois, retomar em conversa nova pelo inventário de leitura.

## 6. Condições para avançar

| Verificação | Exigência |
|---|---|
| Coerência | Português compreensível do começo ao fim; sem repetição ou mistura inexplicável de idiomas |
| Escopo | Mesmas fases do mestre; lote atual claramente delimitado |
| Fonte | Informar arquivos realmente lidos; não alegar recuperação de histórico apenas porque o mestre a menciona |
| Ferramentas | Ações e resultados compreensíveis; nenhuma escrita tratada como concluída sem confirmação |
| Evidência | Distinguir código criado, teste executado e resultado ainda não verificado |
| Segurança | Sem tokens em logs, dados reais em mocks ou exclusões automáticas |
| Design | Google e funcionalidades reais aguardam aprovação visual explícita |

O arquivo integral BLUEPRINT_CAIXA_RAPIDO_V2.md continua não recuperado nesta conversa. Essa lacuna documental está declarada no mestre e não impede a F1 com mocks.

## 7. Ponto de retomada conhecido

- Blueprint mestre entregue: `BLUEPRINT_MESTRE_CAIXA_RAPIDO_WEB.md`.
- Aplicação não foi implementada neste chat.
- Outra IA mostrou ações de escrita no projeto externo `/home/anderson/caixa-rapido-web`; conteúdo e integridade ainda não verificados aqui.
- A F0 colada pelo proprietário está corrompida e não deve ser usada como especificação aprovada.
- Nenhuma aprovação visual da F1 foi registrada neste chat.
- Próximo passo seguro: conversa nova, verificação curta de compreensão e inventário do projeto existente.

## 8. Registro para novos incidentes

Preencher sem expor chaves, tokens ou dados financeiros:

- Data e horário:
- Versão do Chatbox:
- Provedor e nome exato do modelo, quando identificável:
- Roteador ativo ou modelo fixo:
- Modo de trabalho e ferramentas habilitadas:
- Fase e lote solicitados:
- Última ação confirmada:
- Sintoma e trecho curto da saída:
- Arquivos possivelmente afetados:
- Ação de recuperação:
- Resultado observado:

Se o problema reaparecer com modelos diferentes, reunir esses registros para investigar aplicativo, integração de ferramentas e provedor. Não atribuir a falha a um componente sem evidência.

## 9. Uso em futuras criações

Anexar este guia no início de novas tentativas com essa IA. Os nomes do produto e caminho do projeto devem ser ajustados quando se tratar de outro projeto. Preservar a sequência: compreensão curta → inventário → lote pequeno → verificação → ponto de retomada.

Salvar o arquivo não garante memória automática em outro chat ou aplicativo; o guia deve acompanhar a próxima solicitação.
