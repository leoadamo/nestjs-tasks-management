// Type ORM dependencies
import { getConnectionOptions } from 'typeorm';

// Nest.js Modules
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// App Modules
import { TasksModule } from './tasks/tasks.module';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    TasksModule,
  ],
})
export class AppModule {}
