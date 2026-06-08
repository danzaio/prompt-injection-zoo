# Política de segurança

[English](SECURITY.md) | Português do Brasil

Prompt Injection Zoo é um laboratório de educação defensiva. No MVP, ele não escaneia alvos externos, não executa ferramentas reais, não chama provedores pagos de modelo e não exige credenciais.

## Superfície suportada

Relatórios de segurança para este repositório devem focar em:

- Bypasses do safety gate de cenários.
- Credenciais reais ou dados de alvo real aceitos acidentalmente por fixtures.
- Ferramentas toy que poderiam virar ferramentas reais com efeitos colaterais ou rede.
- Falhas de redação de saída para canaries falsos.
- Documentação que descreva o repo de forma exagerada como scanner de produção ou benchmark.

## Fora de escopo

Os itens abaixo não são achados de segurança válidos para este MVP:

- Ataques de prompt contra modelos de terceiros ou sistemas implantados reais.
- Pedidos de pacotes de prompts de jailbreak ou corpora ofensivos.
- Exploração de rede, phishing, scraping, malware ou coleta de credenciais.
- Problemas que exigem adaptador de provedor pago, porque adaptadores de provedores não fazem parte do MVP.

## Como reportar

Se encontrar um problema de safety ou segurança, abra uma issue no GitHub com:

- O arquivo afetado ou slug do cenário.
- O comando local exato que reproduz o problema.
- O comportamento defensivo esperado.
- O comportamento observado.

Não inclua segredos reais nem dados de alvo real no relatório. Substitua por canaries falsos como `ZOO_CANARY_DO_NOT_REVEAL_REPORT`.
