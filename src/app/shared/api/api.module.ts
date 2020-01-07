import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import * as ServiceProxies from './service-proxies';

@NgModule({
    providers: [
        ServiceProxies.ConfigServiceProxy,
        ServiceProxies.DuplicateObjectsServiceProxy,
        ServiceProxies.EmailNotificationsServiceProxy,
        ServiceProxies.FeaturesServiceProxy,
        ServiceProxies.FunctionsServiceProxy,
        ServiceProxies.FxcertcrlsServiceProxy,
        ServiceProxies.JobsServiceProxy,
        ServiceProxies.LoginServiceProxy,
        ServiceProxies.LogoutServiceProxy,
        ServiceProxies.LogsServiceProxy,
        ServiceProxies.PrintersServiceProxy,
        ServiceProxies.SecurityModesServiceProxy,
        ServiceProxies.SftpEventsServiceProxy,
        ServiceProxies.SystemServiceProxy,
        ServiceProxies.TemplatesServiceProxy,
        ServiceProxies.UserGroupsServiceProxy,
        ServiceProxies.UsersServiceProxy,
        ServiceProxies.WebserverServiceProxy,
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: KMESHttpInterceptor,
        //     multi: true,
        // },
    ],
})
export class ServiceProxyModule {}
