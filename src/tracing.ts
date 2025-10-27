import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

console.log('OTEL_EXPORTER_OTLP_ENDPOINT=', process.env.OTEL_EXPORTER_OTLP_ENDPOINT);

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter(), // usará tu .env
  instrumentations: [
    new NestInstrumentation(),
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
  ],
});

sdk.start();
console.log('✅ OpenTelemetry iniciado');

process.on('SIGTERM', async () => {
  await sdk.shutdown();
  process.exit(0);
});
