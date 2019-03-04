import { MsgStateEnum, MsgTypeEnum, MsgRevokeEnum, MsgOfflineEnum, MsgFileStateEnum } from 'src/app/config/app.enum';

export interface IMsgExtendType {
    name: string;       // 名字
    size: number;       // 大小
    percent: number;    // 百分比
    suffix: string;     // 后缀名
    state: number;

    width?: number;      // 宽度
    height?: number;     // 高度
}

export interface IMsgTypeCof {
    sessionid: string;  // 所属会话
    msgtype: number;    // 类型
    content: string;    // 内容[只存放文本]
    from: string;       // 发信人
    to: string;         // 收信人
    revoke: number;     // 是否撤回
    offline: number;    // 是否离线
    clienttime: number; // 客户端时间
    servertime: number; // 服务器时间
    state: number;      // 消息状态[sending|error]

    extend?: IMsgExtendType | null ;    // 扩展字段图片和文件使用
}

export let defaultOps = {
    sessionid: '',
    msgtype: MsgTypeEnum.TEXT,
    content: '',
    from: '',
    to: '',
    revoke: MsgRevokeEnum.UN_REVOKED,
    offline: MsgOfflineEnum.ONLINE,
    clienttime: 0,
    servertime: 0,
    state: MsgStateEnum.INITIAL
} as IMsgTypeCof;

/**
 * 
 */
export abstract class BaseMsgType implements IMsgTypeCof {
    sessionid: string;  // 所属会话
    msgtype: number;    // 类型
    content: string;    // 内容[只存放文本]
    from: string;       // 发信人
    to: string;         // 收信人
    revoke: number;     // 是否撤回
    offline: number;    // 是否离线
    clienttime: number; // 客户端时间
    servertime: number; // 服务器时间
    state: number;      // 消息状态[sending|error]

    extend?: IMsgExtendType | null ;    // 扩展字段[图片大小, 上传进度...]
    
    /**
     * 
     * @param config 生成消息类型的数据配置
     */
    protected constructor(config: IMsgTypeCof) {
        const merges = Object.assign({}, defaultOps, config),
            keys = Reflect.ownKeys( merges );

        for (const key of keys) {
            this[ key ] = merges[ key ];
        }

        this.clienttime = Date.now();
    }

    /**
     * 子类直接覆写即可，部分工厂演变
     */
    static create( ...args ) {
        return null;
    }

    /**
     * 获取初始化的扩展字段
     */
    static getInitialExtends(): IMsgExtendType {
        return {
            name: '',
            width: 0,
            height: 0,
            percent: 0,
            size: 0,
            suffix: '',
            state: MsgFileStateEnum.INITIAL
        };
    }

    /**
     * 根据指定的值获取配置后的扩展字段
     * @param config 指定配置的值
     */
    static getAssignExtends(config: IMsgExtendType): IMsgExtendType {
        return Object.assign({}, this.getInitialExtends(), config);
    }
}
