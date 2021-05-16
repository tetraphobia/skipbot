import ffmpeg from 'fluent-ffmpeg';

export const concat = async (files: string[], out: string) =>
    new Promise((res, rej) => {
        ffmpeg().input(`concat:${files.join('|')}`)
            .save(out)
        res(null)
    })
