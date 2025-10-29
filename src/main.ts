import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import appInsights from 'applicationinsights';

async function bootstrap() {
  appInsights
    .setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING)
    .setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true, true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectConsole(true, true)
    .setUseDiskRetryCaching(true)
    .start();

  const client = appInsights.defaultClient;
  client.context.tags[client.context.keys.cloudRole] = 'my-node-api';

  client.trackEvent({
    name: 'server_started',
    properties: { environment: 'production' },
  });

  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 443;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
