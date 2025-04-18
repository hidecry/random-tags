# 👻 Random Tags

> Um script elegante para alternar automaticamente entre as badges de servidor do Discord.

## 📋 Índice

- [Sobre](#-sobre)
- [Instalação](#-instalação)
- [Como usar](#-como-usar)
- [Configurações](#-configurações)
- [Limitações](#-limitações)
- [Contribuições](#-contribuições)
- [Licença](#-licença)

## 🚀 Sobre

O **Random Tags** é uma ferramenta que permite alternar automaticamente entre as badges de servidor do Discord. Ideal para usuários que desejam exibir diferentes badges de servidor em intervalos regulares.


## 💻 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/hidecry/random-tags.git
cd random-tags
```


## 🎮 Como usar

### Método 1: Usando o arquivo .bat (Recomendado para Windows)

1. Abra o arquivo `index.js`
2. Substitua o token do Discord pelo seu:
```javascript
const token = 'SEU_TOKEN_AQUI';
```

3. Dê um duplo clique no arquivo `start.bat`
   - O script verificará automaticamente se o Node.js está instalado
   - Instalará as dependências necessárias
   - Iniciará o programa

### Método 2: Usando o terminal

1. Abra o arquivo `index.js`

3. Execute o script:
```bash
node index.js
```

## ⚙️ Configurações

Você pode personalizar o comportamento do script ajustando os seguintes parâmetros:

- `interval`: Tempo entre as trocas de badge (padrão: 5000ms)
- `rateLimitDelay`: Delay inicial para rate limits (padrão: 1000ms)
- `maxRetries`: Número máximo de tentativas (padrão: 3)

## ⚠️ Limitações

- O Discord pode limitar o número de requisições em um determinado período
- O uso excessivo pode resultar em restrições temporárias da sua conta
- Recomenda-se usar com moderação

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

<div align="center">
  <sub>Construído com ❤️ por <a href="https://github.com/hidecry">ygor</a></sub>
</div> 
