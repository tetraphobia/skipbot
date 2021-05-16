import { Command, CommandMessage } from '@typeit/discord';
import {concat} from '../../lib/ffmpegConcat';
import {sync} from 'glob';

export abstract class AutoRaidLead {
    @Command('raidlead')
    async raidlead(command: CommandMessage){
        const voiceChan = command.member.voice.channel;


        if (voiceChan){
            let globs: string[] = [
                `${__dirname}/sounds/greeting/*.ogg`,
                `${__dirname}/sounds/user/*.ogg`,
                `${__dirname}/sounds/action/*.ogg`,
                `${__dirname}/sounds/mechanic/*.ogg`,
                `${__dirname}/sounds/otherwise/*.ogg`,
                `${__dirname}/sounds/consequence/*.ogg`,
            ]

            let files = globs.map(pattern => {
                let matches = sync(pattern)
                return matches[Math.floor(Math.random() * matches.length)];
            });
            console.log(files)

            concat(files, `${__dirname}/out.ogg`)
                .then(() => {
                voiceChan.join()
                    .then(conn => {
                        const dispatcher = conn.play(`${__dirname}/out.ogg`);
                        dispatcher.on('speaking', speaking => {
                            if (!speaking) {voiceChan.leave()}
                        })
                        dispatcher.on('end', end => voiceChan.leave())
                    })
                    .catch(console.log)
            })
        }
    }
}