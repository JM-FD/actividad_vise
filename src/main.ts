let ai: any;
try { ai = require('applicationinsights'); } catch {}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const cs =
    process.env.APPINSIGHTS_CONNECTION_STRING ||
    process.env.APPLICATIONINSIGHTS_CONNECTION_STRING; // por si usas este nombre

  // Inicializa AI sólo si hay connection string
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
      console.error('Application Insights no pudo iniciar:', e);
    }
  }

  const app = await NestFactory.create(AppModule);

  const port = Number(process.env.PORT) || 3000; // 👈 App Service te inyecta este puerto
  await app.listen(port, '0.0.0.0');
  console.log(`Listening on ${port}`);
}

bootstrap();
