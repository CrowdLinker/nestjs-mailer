import {
  NodemailerDefaultsDrivers,
  NodemailerTransportDrivers,
} from './drivers.interface';
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { NodemailerDrivers } from '../constants/drivers.constants';

/**
 * Nodemailer options type declaration.
 *
 * @interface
 */
export interface NodemailerOptions<T extends NodemailerDrivers> {
  transport: NodemailerTransportDrivers<T>;
  defaults: NodemailerDefaultsDrivers<T>;
}

/**
 * Nodemailer options factory type declaration.
 *
 * @interface
 */
export interface NodemailerOptionsFactory<T extends NodemailerDrivers> {
  createNodemailerOptions():
    | Promise<NodemailerOptions<T>>
    | NodemailerOptions<T>;
}

/**
 * Nodemailer async options type declaration.
 *
 * @interface
 */
export interface NodemailerAsyncOptions<T extends NodemailerDrivers>
  extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  inject?: any[];
  useClass?: Type<NodemailerOptionsFactory<T>>;
  useExisting?: Type<NodemailerOptionsFactory<T>>;
  useFactory?: (
    ...args: any[]
  ) => Promise<NodemailerOptions<T>> | NodemailerOptions<T>;
}
