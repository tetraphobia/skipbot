import express from "express";
import {SkipClient, Skipbot} from "../../index";
import {MessageEmbed} from 'discord.js'

export abstract class LFGWebHook {
    private static _exp = express();
    static get exp(){return this._exp};


    static _getAvatar(desc) {
        let img = 'https://cdn.discordapp.com/avatars/839117492541849600/1c762df3e35050a5d7cc1ba9bffb7a8c.png';
        let id = desc.match(/https?:\/\/w?w?w?.?warcraftlogs.com\/character\/id\/\d{8}/);
        if (id){
            console.log(id[0]);
            return img;
        } else {
            console.log("Couldn't find a link to warcraftlogs in post description. Using fallback avatar.")
            return img;
        }

    }

    static _send(client, json){
        const channel = client.channels.cache.get('839110780469248021')
        const avatar = LFGWebHook._getAvatar(json.description)
        const embed = new MessageEmbed()
            .setColor('#FF5700')
            .setTitle(json.title)
            .setURL(json.url)
            .setAuthor('Potential Recruit', 'https://i.imgur.com/pL0asch.png')
            .setDescription(json.description)
            .setThumbnail(avatar)
            .setTimestamp()
            .setFooter('Message Skipkin for issues about the bot.')

        channel.send(embed)
    }

    static init() {
        const client = Skipbot.client

        client.on('post_request', this._send)

        this._exp.use(express.json())

        this._exp.post('/', (req, res) => {
            if (/\[US]/.test(req.body.title) && /\[H]/.test(req.body.title) && /\[LFG]/.test(req.body.title)) {
                client.emit('post_request', client, req.body)
            }

            res.status(200).end()
        })

        this._exp.listen(SkipClient.config.expressPort, () =>
            console.log(`🚀 Listening for webhooks on port ${SkipClient.config.expressPort}`)
        )

    }

}

LFGWebHook.init()
