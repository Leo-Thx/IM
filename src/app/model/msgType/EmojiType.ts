import { BaseMsgType, IMsgTypeCof } from './MsgType.base';
import { MsgTypeEnum } from 'src/app/config/app.enum';
import { MsgTextType } from './TextType';

/**
 * Emoji消息类型
 * @extends MsgTextType
 */
export class MsgEmojiType extends MsgTextType {

    private constructor(config: IMsgTypeCof) {
        super( config );
        this.msgtype = MsgTypeEnum.EMOJI;
    }

    static create(config: IMsgTypeCof) {
        return new MsgTextType( config );
    }
}
