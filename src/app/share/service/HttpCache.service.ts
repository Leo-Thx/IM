import { Injectable } from "@angular/core";

@Injectable()
export class HttpCacheService {
    private cache: Map<any, any> = new Map();
    getCache( key: any ): any {
        return this.cache.get( key );
    }
    setCache( key: any, value: any ) {
        this.cache.set( key, value );
    }
}
