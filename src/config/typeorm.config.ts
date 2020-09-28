import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'task_management',
  password: '',
  database: 'task_management_dev',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true
};
