const axios = require('axios');

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

    async getGuilds() {
        try {
            const response = await axios.get(`${this.baseUrl}/users/@me/guilds`, {
                headers: this.headers
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao obter servidores:', error.message);
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
            console.log(`Badge alterada para o servidor: ${guildId}`);
        } catch (error) {
            if (error.response?.status === 405) {
                try {
            
                    const response = await axios.put(
                        `${this.baseUrl}/users/@me/clan`,
                        payload,
                        { headers: this.headers }
                    );
                    console.log(`Badge alterada para o servidor: ${guildId}`);
                } catch (putError) {
                    console.error(`Erro ao alterar badge: ${putError.response?.status || putError.message}`);
                }
            } else {
                console.error(`Erro ao alterar badge: ${error.response?.status || error.message}`);
            }
        }
    }

    async startSwitching(interval = 5000) {
        console.log('Iniciando troca automática de badges...');
        const guilds = await this.getGuilds();

        if (!guilds.length) {
            console.log('Nenhum servidor encontrado!');
            return;
        }

        console.log(`Encontrados ${guilds.length} servidores.`);
        
        while (true) {
            for (const guild of guilds) {
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
