# Segurança e ética

[English](../ethics.md) | Português do Brasil

Prompt Injection Zoo é software de educação defensiva. Todo cenário é local, toy-only e escrito para ensinar tratamento de fronteiras de contexto sem habilitar abuso real.

## Fronteiras

- Apenas canaries falsos, por exemplo `ZOO_CANARY_DO_NOT_REVEAL_001`.
- Apenas ferramentas toy, como `toy_search`, `toy_send_message` e `toy_write_memory`.
- Sem alvos vivos, credenciais reais, URLs reais de exfiltração, ferramentas destrutivas, automação de browser, controle do filesystem do host ou ações de rede.
- Sem adaptadores de provedores no MVP.
- Sem pacotes de prompts para atacar sistemas implantados.

## Regra de cenário

Um cenário válido precisa incluir metadados de segurança, mapeamentos OWASP, objetivos de aprendizado, formato de payload seguro, não-objetivos explícitos e comportamento proibido.

O safety gate rejeita credenciais com aparência real, URLs externas no conteúdo do cenário, nomes de ferramentas destrutivas, níveis de segurança reais bloqueados e texto não confiável direcionado a sistemas reais.

## Uso pretendido

Use este repo para ensinar e avaliar conceitos defensivos:

- Hierarquia de instruções.
- Rotulagem de fronteiras de confiança.
- Autorização de ferramentas e memória.
- Proveniência de fontes.
- Evidência em vez de narrativa de logs.
- Redação de canaries.

Não use para desenvolver, empacotar ou distribuir jailbreaks operacionais, fluxos de phishing, coleta de credenciais, malware, exfiltração, scraping ou scanning de alvos vivos.

## Reportando problemas de segurança

Veja `SECURITY.pt-BR.md` para a política de reporte. Não inclua segredos reais ou dados de alvo real em um relatório. Use canaries falsos.
