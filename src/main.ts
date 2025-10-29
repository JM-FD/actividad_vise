// main.ts
/* eslint-disable @typescript-eslint/no-var-requires */
let ai: any;
try { ai = require('applicationinsights'); } catch {}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

process.on('unhandledRejection', (e) => console.error('unhandledRejection', e));
process.on('uncaughtException', (e) => console.error('uncaughtException', e));

async function bootstrap() {
  const cs =
    process.env.APPINSIGHTS_CONNECTION_STRING ||
    process.env.APPLICATIONINSIGHTS_CONNECTION_STRING;

  // --- Application Insights (opcional) ---
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
        // .setSendLiveMetrics(true) // <- habilítalo si quieres Live Metrics
        .start();

      const client = ai.defaultClient;
      if (client?.context?.tags && client?.context?.keys?.cloudRole) {
        client.context.tags[client.context.keys.cloudRole] = 'my-node-api';
      }

      // Ejemplo de evento de arranque
      client?.trackEvent({
        name: 'server_started',
        properties: { environment: process.env.NODE_ENV ?? 'production' },
      });

      // Asegura flush en salida
      const flushAndExit = (code = 0) =>
        client?.flush({ isAppCrashing: false, callback: () => process.exit(code) });

      // Señales comunes en App Service / contenedores
      process.on('SIGTERM', () => flushAndExit(0));
      process.on('SIGINT', () => flushAndExit(0));
    } catch (e) {
      console.error('AI init error:', e);
    }
  }

  // --- Nest ---
  const app = await NestFactory.create(AppModule);

  // Permite a Nest ejecutar shutdown hooks (por si usas Terminus/Health/etc.)
  app.enableShutdownHooks();

  const port = Number(process.env.PORT) || 3000; // En App Service SIEMPRE PORT (no 443)
  await app.listen(port, '0.0.0.0');
  console.log('ENV PORT =', process.env.PORT, 'Listening on', port);
}

bootstrap();
