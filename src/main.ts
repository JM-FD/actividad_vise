// main.ts
let ai: any; try { ai = require('applicationinsights'); } catch {}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

process.on('unhandledRejection', (e) => console.error('unhandledRejection', e));
process.on('uncaughtException', (e) => console.error('uncaughtException', e));

async function bootstrap() {
  const cs = process.env.APPINSIGHTS_CONNECTION_STRING || process.env.APPLICATIONINSIGHTS_CONNECTION_STRING;

  if (cs && ai?.setup) {
    try {
      ai
        .setup(cs)
        .setAutoDependencyCorrelation(true)
        .setAutoCollectRequests(true)
        .setAutoCollectPerformance(true, true)
        .setAutoCollectExceptions(true)
        .setAutoCollectDependencies(true)
        .setAutoCollectConsole(true, true)
        .setUseDiskRetryCaching(true)
        .start();
    } catch (e) {
      console.error('AI init error:', e);
    }
  }

  const app = await NestFactory.create(AppModule);

  const port = Number(process.env.PORT) || 3000; // 👈 SIEMPRE el PORT que da Azure
  await app.listen(port, '0.0.0.0');
  console.log('ENV PORT=', process.env.PORT, 'Listening on', port);
}
bootstrap();
