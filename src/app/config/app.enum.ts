// 消息类型
export const enum MsgTypeEnum {
    TEXT    = 1,    // 文本
    IMAGE   = 2,    // 图片
    FILE    = 3,    // 文件
    EMOJI   = 4,    // emoji表情
    SHAKE   = 5,    // 抖动
    SYSTEM_TIP = 6,    //系统提示
}

// 消息状态
export const enum MsgStateEnum {
    INITIAL     = 0,    // 初始化
    SENDING     = 1,    // 发送中
    ERROR       = 2,    // 错误
    SENDED      = 3     // 已发送
}

// 文件状态
export const enum MsgFileStateEnum {
    INITIAL         = 0,    // 初始化
    UPLOADING       = 1,    // 正在上传
    ERROR           = 2,    // 上传失败
    UPLOADED        = 3     // 上传成功
}

// 消息是否撤回[功能暂时不做]
export const enum MsgRevokeEnum {
    UN_REVOKED = 0, 
    REVOKED = 1,
}

// 是否是离线消息
export const enum MsgOfflineEnum {
    ONLINE = 0,
    OFFLINE = 1,
}
