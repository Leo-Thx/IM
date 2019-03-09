// 外部类型声明
interface NgElectron {
    Class: INgElectronConstructor
}

interface INgElectronConstructor {
    new(): NgElectron
    init: Function;
    login(account: string, pwd: string): void;
}


interface Window {
    $NgEl: NgElectron;
}
