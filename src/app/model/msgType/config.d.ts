import { MsgStateEnum, MsgTypeEnum, MsgRevokeEnum, MsgOfflineEnum, MsgFileStateEnum } from 'src/app/config/app.enum';

/**
 * @interface 扩展字段
 * @property name
 * @property size
 * @property percent
 * @property suffix
 * @property state
 * @property width
 * @property height
 */
declare interface IMsgExtendType {
    name: string;       // 名字
    size: number;       // 大小
    percent: number;    // 百分比
    suffix: string;     // 后缀名
    state: MsgFileStateEnum;      // 状态

    width?: number;      // 宽度
    height?: number;     // 高度
}


/**
 * @interface 消息的含有的基本属性
 */
declare interface IMsgTypeCof {
    sessionid: string;          // 所属会话
    msgtype: MsgTypeEnum;       // 类型
    content: string;            // 内容[只存放文本]
    from: string;               // 发信人
    to: string;                 // 收信人
    revoke: number;             // 是否撤回
    offline: MsgOfflineEnum;    // 是否离线
    clienttime: number;         // 客户端时间
    servertime: number;         // 服务器时间
    state: MsgStateEnum;        // 消息状态[sending|error]

    extend?: IMsgExtendType | null ;    // 扩展字段图片和文件使用
}