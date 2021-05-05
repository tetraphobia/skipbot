import { Command, CommandMessage } from '@typeit/discord';

export abstract class EasterEggs {
    @Command('bababooey')
    async bababooey(command: CommandMessage){
        const voiceChan = command.member.voice.channel;

        if (voiceChan){
            voiceChan.join()
                .then(conn => {
                    const dispatcher = conn.play(`${__dirname}/sounds/bababooey.mp3`)
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
}