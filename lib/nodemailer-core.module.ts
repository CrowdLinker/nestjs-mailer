import {
  NodemailerOptions,
  NodemailerAsyncOptions,
  NodemailerOptionsFactory,
} from './interfaces';
import { Nodemailer } from './nodemailer';
import { NODEMAILER_OPTIONS, NodemailerDrivers } from './constants';
import { DynamicModule, Global, Module, Provider, Type } from '@nestjs/common';

/**
 * Import and provide base nodemailer related classes.
 *
 * Refer:
 * 1. https://docs.nestjs.com/modules#dynamic-modules
 * 2. https://docs.nestjs.com/fundamentals/dynamic-modules
 *
 * @global
 *
 * @module
 */
@Global()
@Module({})
export class NodemailerCoreModule {
  /**
   * Create a dynamic nodemailer module.
   *
   * @param {NodemailerOptions} options
   *
   * @returns {DynamicModule}
   */
  static forRoot<T extends NodemailerDrivers>(
    options: NodemailerOptions<T>,
  ): DynamicModule {
    return {
      module: NodemailerCoreModule,
      providers: [
        {
          name: NODEMAILER_OPTIONS,
          provide: NODEMAILER_OPTIONS,
          useValue: options,
        },
        Nodemailer,
      ],
      exports: [Nodemailer],
    };
  }

  /**
   * Create a dynamic nodemailer module asynchronous-ly.
   *
   * @param {NodemailerOptions} options
   *
   * @returns {DynamicModule}
   */
  static forRootAsync<T extends NodemailerDrivers>(
    options: NodemailerAsyncOptions<T>,
  ): DynamicModule {
    const asyncProviders = this.createAsyncProviders(options);

    return {
      module: NodemailerCoreModule,
      imports: options.imports,
      providers: [...asyncProviders, Nodemailer],
      exports: [Nodemailer],
    };
  }

  /**
   * Create nodemailer providers asynchronous-ly.
   *
   * @param {NodemailerAsyncOptions} options
   *
   * @returns {Provider[]}
   */
  private static createAsyncProviders<T extends NodemailerDrivers>(
    options: NodemailerAsyncOptions<T>,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    const useClass = options.useClass as Type<NodemailerOptionsFactory<T>>;

    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  /**
   * Create nodemailer options provider asynchronous-ly.
   *
   * @param {NodemailerAsyncOptions} options
   *
   * @returns {Provider}
   */
  private static createAsyncOptionsProvider<T extends NodemailerDrivers>(
    options: NodemailerAsyncOptions<T>,
  ): Provider {
    if (options.useFactory) {
      return {
        name: NODEMAILER_OPTIONS,
        provide: NODEMAILER_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    // Refer: https://github.com/microsoft/TypeScript/issues/31603
    const inject = [
      (options.useExisting || options.useClass) as Type<
        NodemailerOptionsFactory<T>
      >,
    ];

    return {
      name: NODEMAILER_OPTIONS,
      provide: NODEMAILER_OPTIONS,
      useFactory: async (optionsFactory: NodemailerOptionsFactory<T>) =>
        await optionsFactory.createNodemailerOptions(),
      inject,
    };
  }
}
