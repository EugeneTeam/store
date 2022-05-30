import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { models } from '../../entities';

@Module({
  imports: [
    SequelizeModule.forFeature(models)
  ],
  exports: [
    SequelizeModule.forFeature(models)
  ]
})
export class ModelsModule {}
