import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const PORT = process.env.PORT || 3000;
  app.enableCors({ origin: '*' });

  const config = new DocumentBuilder()
    .setTitle('Knights API')
    .addTag('Knights')
    .setDescription('API para gerenciamento de cavaleiros')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, '0.0.0.0', async () =>
    console.log(`🚀 Application is running on: ${await app.getUrl()}`),
  );
}
bootstrap();
