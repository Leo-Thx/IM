import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoopHttpInterceptor } from './Noop.interceptor';
import { AuthHttpInterceptor } from './Auth.interceptor';
import { LogHttpInterceptor } from './Log.interceptor';

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, userClass: NoopHttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, userClass: AuthHttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, userClass: LogHttpInterceptor, multi: true }
];
