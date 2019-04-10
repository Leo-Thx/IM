const actionMap = new Map();

export function defineType(type: string){
    if( actionMap.has( type ) ) throw new Error(`${type} is already exists`);
    actionMap.set(type, type);
    return type;
}