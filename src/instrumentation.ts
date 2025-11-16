// src/instrumentation.ts
import 'dotenv/config'; // <- CARGA .env PRIMERO
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

const AXIOM_DOMAIN  = process.env.AXIOM_DOMAIN  ?? 'api.axiom.co';
const AXIOM_TOKEN   = process.env.AXIOM_TOKEN ?? 'xaat-cb94938e-a80a-45e2-b263-6f2fff9874aa';
const AXIOM_DATASET = process.env.AXIOM_DATASET ?? 'vise';
const SERVICE_NAME  = process.env.OTEL_SERVICE_NAME ?? 'vise-app';
const SERVICE_VER   = process.env.npm_package_version ?? '1.0.0';

// Validaciones explícitas para evitar "undefined"
if (!AXIOM_TOKEN)   throw new Error('Falta AXIOM_TOKEN (ver .env o variables de entorno)');
if (!AXIOM_DATASET) throw new Error('Falta AXIOM_DATASET (ver .env o variables de entorno)');

const traceExporter = new OTLPTraceExporter({
  url: `https://${AXIOM_DOMAIN}/v1/traces`,
  headers: {
    Authorization: `Bearer ${AXIOM_TOKEN}`,
    'X-Axiom-Dataset': AXIOM_DATASET,
  },
});

const sdk = new NodeSDK({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: SERVICE_NAME,
    [ATTR_SERVICE_VERSION]: SERVICE_VER,
  }),
  traceExporter,
  instrumentations: [
    getNodeAutoInstrumentations(),
    new NestInstrumentation(),
  ],
});

sdk.start();

process.on('SIGTERM', async () => {
  await sdk.shutdown();
  process.exit(0);
});
