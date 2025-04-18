const axios = require('axios');


const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    cyan: '\x1b[36m',
    magenta: '\x1b[35m'
};


const clearLine = () => {
    process.stdout.write('\r\x1b[K');
};


const log = {
    info: (message) => {
        clearLine();
        process.stdout.write(`${colors.cyan}ℹ️ ${colors.bright}${message}${colors.reset}`);
    },
    success: (message) => {
        clearLine();
        process.stdout.write(`${colors.green}✅ ${colors.bright}${message}${colors.reset}`);
    },
    error: (message) => {
        clearLine();
        process.stdout.write(`${colors.red}❌ ${colors.bright}${message}${colors.reset}`);
    },
    warning: (message) => {
        clearLine();
        process.stdout.write(`${colors.yellow}⚠️ ${colors.bright}${message}${colors.reset}`);
    },
    server: (message) => {
        clearLine();
        process.stdout.write(`${colors.magenta}🔄 ${colors.bright}${message}${colors.reset}`);
    }
};

class Clans {
    constructor(token) {
        this.token = token;
        this.headers = {
            'Authorization': token,
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': '*/*',
            'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Origin': 'https://discord.com',
            'Referer': 'https://discord.com/channels/@me'
        };
        this.baseUrl = 'https://discord.com/api/v9';
    }

    async checkToken() {
        try {
            const response = await axios.get(`${this.baseUrl}/users/@me`, {
                headers: this.headers
            });
            log.success(`Token válido! Conectado como: ${response.data.username}#${response.data.discriminator}`);
            return true;
        } catch (error) {
            if (error.response?.status === 401) {
                log.error('Token inválido ou expirado. Por favor, gere um novo token.');
            } else if (error.response?.status === 403) {
                log.error('Token não tem permissões suficientes. Verifique se o token tem acesso aos recursos necessários.');
            } else {
                log.error(`Erro ao verificar token: ${error.message}`);
            }
            return false;
        }
    }

    async getGuilds() {
        try {
            const response = await axios.get(`${this.baseUrl}/users/@me/guilds`, {
                headers: this.headers
            });
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                log.error('Token inválido ou expirado. Por favor, gere um novo token.');
            } else if (error.response?.status === 403) {
                log.error('Token não tem permissões para acessar os servidores.');
            } else {
                log.error(`Erro ao obter servidores: ${error.message}`);
            }
            return [];
        }
    }

    async setGuildBadge(guildId) {
        const payload = {
            identity_guild_id: String(guildId),
            identity_enabled: true
        };

        try {
          
            const response = await axios.post(
                `${this.baseUrl}/users/@me/clan`,
                payload,
                { headers: this.headers }
            );
            log.success(`Badge alterada para o servidor: ${guildId}`);
        } catch (error) {
            if (error.response?.status === 405) {
                try {
               
                    const response = await axios.put(
                        `${this.baseUrl}/users/@me/clan`,
                        payload,
                        { headers: this.headers }
                    );
                    log.success(`Badge alterada para o servidor: ${guildId}`);
                } catch (putError) {
                    log.error(`Erro ao alterar badge: ${putError.response?.status || putError.message}`);
                }
            } else {
                log.error(`Erro ao alterar badge: ${error.response?.status || error.message}`);
            }
        }
    }

    async startSwitching(interval = 10000) {
        log.info('Verificando token...');
        const isTokenValid = await this.checkToken();
        
        if (!isTokenValid) {
            log.error('Não é possível continuar com um token inválido.');
            return;
        }

        log.info('Iniciando troca automática de badges...');
        const guilds = await this.getGuilds(); 


        if (!guilds.length) {
            log.warning('Nenhum servidor encontrado!');
            return;
        }

        log.success(`Encontrados ${guilds.length} servidores.`);
        
        while (true) {
            for (const guild of guilds) {
                log.server(`Processando servidor: ${guild.id}`);
                await this.setGuildBadge(guild.id);
                await new Promise(resolve => setTimeout(resolve, interval));
            }
        }
    }
}

// Substitua 'SEU_TOKEN_AQUI' pelo seu token do Discord
const token = 'SEU_TOKEN_AQUI';
const switcher = new Clans(token);
switcher.startSwitching(); 
