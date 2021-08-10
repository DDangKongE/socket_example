import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      validationSchema: Joi.object({
        NODE_PORT: Joi.string().required(),
        REDIS_PORT: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'), // <-- path to the static files
    }),
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
