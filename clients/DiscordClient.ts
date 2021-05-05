import { Discord, CommandNotFound, CommandMessage } from '@typeit/discord'
import * as Path from "path"
import {SkipClient} from '../index'

const imports = SkipClient.config.modules_enabled.map(e =>
    Path.join(__dirname, "../", "modules", e))

@Discord(SkipClient.config.prefix, {
    import: imports
})
export abstract class SkipbotDiscord {
}