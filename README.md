## Desafio Go

Desafio Docker, Aplicação NodeJS, SQL e NGINX como proxy reverso

Para a utilização deve ser rodado o seguinte comando

```shell
docker-compose up
``` 

Para saber que o serviço foi executado com sucesso, você pode rodar o comando

```shell
curl -i localhost:8080 
``` 

E receber uma mensagem informando sucesso, algo como:

```shell

curl -i localhost:8080  
HTTP/1.1 200 OK
Server: nginx/1.27.0
Date: Tue, 18 Jun 2024 03:08:05 GMT
Content-Type: text/html; charset=utf-8
Content-Length: 135
Connection: keep-alive

<h1>Full Cycle Rocks!</h1>


            <ul>

            <li>Charlie</li>
<li>Alice</li>
<li>Bob</li>
            </ul>
```