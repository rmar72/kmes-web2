import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import * as ClientApi from './service-proxies';

@NgModule({
    providers: [
        ClientApi.ClientApi
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: KMESHttpInterceptor,
        //     multi: true,
        // },
    ],
})
export class ServiceProxyModule {}
