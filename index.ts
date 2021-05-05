import { Client } from '@typeit/discord';

export class SkipClient extends Client {
    private static _config = require('./config.json');
    constructor(){
        super()
    }

    static get config(){
        return this._config
    }
}

export class Skipbot {
    public static _client: SkipClient;

    static get client(): SkipClient {
        return this._client;
    }

    static start() {
        this._client = new SkipClient();

        this._client.login(
            SkipClient.config.token,
            `${__dirname}/clients/*.ts`
        );

        console.log(SkipClient.getCommands())
    }
}

Skipbot.start()