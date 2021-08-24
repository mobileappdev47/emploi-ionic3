import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { shim as shimFinally } from 'promise.prototype.finally';

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
shimFinally();
