import { BaseMsgType, IMsgTypeCof } from './MsgType.base';
import { MsgTypeEnum } from 'src/app/config/app.enum';

/**
 * 纯文本消息类型
 * @extends BaseMsgType
 */
export class MsgTextType extends BaseMsgType {

    protected constructor(config: IMsgTypeCof) {
        super( config );
        this.msgtype = MsgTypeEnum.TEXT;
    }

    static create(config: IMsgTypeCof) {
        return new MsgTextType( config );
    }
}
