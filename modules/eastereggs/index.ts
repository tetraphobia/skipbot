import { Command, CommandNotFound, CommandMessage } from '@typeit/discord';
import {concat} from "../../lib/ffmpegConcat";

export abstract class EasterEggs {
    @Command('bababooey')
    async bababooey(command: CommandMessage){
        const voiceChan = command.member.voice.channel;

        if (voiceChan){
            voiceChan.join()
                .then(conn => {
                    const dispatcher = conn.play(`${__dirname}/sounds/bababooey.mp3`, {volume: 0.75})
                    dispatcher.on('speaking', speaking => {
                        if (!speaking) {voiceChan.leave()}
                    })
                    dispatcher.on('end', end => {voiceChan.leave()})
                })
                .catch(err => console.log(err))
        } else {
            await command.channel.send("Baba booey!")
        }
    }

    @CommandNotFound()
    private notFound(command: CommandMessage){
        if (command.content.match(/she{2,}sh/i)){
            const voiceChan = command.member.voice.channel;
            if (voiceChan){
                let files = [
                    `${__dirname}/sounds/sheeshstart.ogg`,
                ];

                const count = (command.content.match(/e{4}/gi) || [])
                count.forEach(e => files.push(`${__dirname}/sounds/ee.ogg`))

                files.push(`${__dirname}/sounds/sheeshend.ogg`)

                console.log(`${command.member.user} is sheeshing with a length of ${count.length}`)
                console.log(files)

                concat(files, `${__dirname}/out.ogg`)
                    .then(() =>
                        voiceChan.join()
                            .then(conn => {
                                const dispatcher = conn.play(`${__dirname}/out.ogg`, {volume: 0.75})
                                dispatcher.on('speaking', speaking => {
                                    if (!speaking) {voiceChan.leave()}
                                })
                                dispatcher.on('end', end => {voiceChan.leave()})
                            })
                            .catch(console.log)
                    )
            } else {
                command.channel.send(command.content.replace(/\>/, '').toUpperCase())
            }
        }
    }
}