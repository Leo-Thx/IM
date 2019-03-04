import { BaseMsgType, IMsgTypeCof, IMsgExtendType } from './MsgType.base';
import { MsgTypeEnum } from 'src/app/config/app.enum';

/**
 * 文件消息类型
 * @attrs   包含的扩展字段
 *  extend: {
 *      name: string
 *      size: number
 *      percent: number
 *      suffix: string
 *      state: number
 *  }
 * @extends BaseMsgType
 */
export class MsgFileType extends BaseMsgType {
    /**
     * 通过静态函数构造
     * @param config config
     * @param extend extend
     */
    protected constructor( config: IMsgTypeCof, extend: IMsgExtendType ) {
        super( config );
        this.extend = extend;
        this.msgtype = MsgTypeEnum.FILE;
    }

    /**
     * 根据选项构造新的图片消息类型
     * @param config 配置项
     * @param extend 扩展的字段
     */
    static create( config: IMsgTypeCof, extend?: IMsgExtendType ) {
        if ( extend == null || config.extend == null ) {
            extend = this.getInitialExtends();
        } else {
            extend = this.getAssignExtends( config.extend );
        }

        return new MsgFileType( config, extend );
    }
}

