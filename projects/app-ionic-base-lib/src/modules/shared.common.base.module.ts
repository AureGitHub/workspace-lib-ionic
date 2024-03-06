import { LOCALE_ID, ModuleWithProviders, NgModule } from "@angular/core";
import { MyHttpService } from "../services/my-http.service";
import { SeguridadService } from "../services/seguridad.service";
import { UtilService } from "../services/util.service";
import { LocalStoragedService } from "../services/localStorage.service";
import { SharedComponentsModule } from "../components/shared-components.module";
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { RolGuard } from "../guard/rol.guard";

registerLocaleData(es);

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/');
}

@NgModule({
  imports:[
    HttpClientModule,
    SharedComponentsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],          
          
      }
    }),
  ],

  exports:[
    HttpClientModule,
    SharedComponentsModule,
    TranslateModule
  ]


})
export class SharedCommomBaseModule { 
  public static forRoot(environment: any, settings : any): ModuleWithProviders<SharedCommomBaseModule> {

    //aqui puedo intentar hacer el hppt
   
    return {
        ngModule: SharedCommomBaseModule,
        providers: [
          LocalStoragedService,
          // MyHttpService,
          SeguridadService,
          TranslateService,
          UtilService,
          RolGuard,
            {
                provide: 'env', // you can also use InjectionToken
                useValue: environment
            },
            { provide: 'settings', useValue: settings},
            { provide: LOCALE_ID, useValue: 'es-*'},
        ]
    };
}
}