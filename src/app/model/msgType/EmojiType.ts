import { IMsgTypeCof } from './config';
import { MsgTypeEnum } from 'src/app/config/app.enum';
import { MsgTextType } from './TextType';

/**
 * Emoji消息类型[用文字代替图片做占位符]
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
