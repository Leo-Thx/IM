import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoopHttpInterceptor } from './Noop.interceptor';
import { AuthHttpInterceptor } from './Auth.interceptor';
import { LogHttpInterceptor } from './Log.interceptor';

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: NoopHttpInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: LogHttpInterceptor, multi: true }
];
