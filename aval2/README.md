# Instruções


## Tecnologias utilizadas
- `Noje.js`
- `WebSockets`
- `Socket.io`

## A aplicação

- Foi implementado um **Jogo da Velha**, com 2 jogadores e vários telespectadores

- Os dois primeiros clientes a entrarem no servidor serão os **jogadores**. Se o cliente entrar e já houver jogadores, ele será um **espectador**.

- A cada fim de partida o jogo é reiniciado contabilizando os pontos para o vencedor

- Se um jogador se desconectar o jogo é finalizado

- Para realizar a comunicação em tempo real foi utilizado WebSockets com a biblioteca `socket.io`. Todo evento emitido no jogo todos os clientes são notificados

## Iniciar aplicação

- node index.js
- Browser HTTP GET /