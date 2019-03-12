import { BaseMsgType } from './BaseMsgType';
import { IMsgTypeCof, IMsgExtendType } from './config';

import { MsgFileType } from './FileType';
import { MsgTypeEnum } from 'src/app/config/app.enum';

/**
 * 图片消息类型
 * @attrs   包含的扩展字段
 *  extend: {
 *      width: number
 *      height: number
 *  }
 * @extends MsgFileType
 */
export class MsgImageType extends MsgFileType {
    /**
     * 构造函数直接私有化，只能通过静态函数构造
     * @param config config
     * @param extend extend
     */
    private constructor( config: IMsgTypeCof, extend: IMsgExtendType ) {
        super( config, extend );
        this.extend = extend;

        this.extend.width = 0;
        this.extend.height = 0;

        this.msgtype = MsgTypeEnum.IMAGE;
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

        return new MsgImageType( config, extend );
    }
}

