# Instruções

## Tecnologias utilizadas
- `Noje.js`
- `WebSockets`
- `Socket.io`
- `Protocolo mqtt`
- `Broker mqtt.eclipse.org`

## index.js

- Responsável por simular os sensores de temperatura e umidade relativa

- O "sensor" de temperatura publica a temperatura em °C a cada 3 segundos no tópico ***sensortempufa***. A "temperatura"

- O "sensor" de umidade publica a cada 10 segundos no tópico ***sensorumidadeufma***

## server.js

- Responsável pela inscrição nos tópicos ***sensortempufa*** e ***sensorumidadeufma***, e também o envio dessas informações para um arquivo de visualização **index.html**

- Como o browser não suporta o `protocolo mqtt` a comunicação com a camada de visualização foi realizada com WebSockets utilizando a biblioteca `socket.io`

## Iniciar aplicação

- node index.js
- node server.js
- Browser HTTP GET / 