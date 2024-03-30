/* eslint-disable import/no-extraneous-dependencies */

/**
 *  wext-manifest-webpack-plugin
 *
 *  @author   abhijithvijayan <abhijithvijayan.in>
 *  @license  MIT License
 */

import {Compiler, Compilation, Module, Dependency} from 'webpack';

const PLUGIN_NAME = 'wext-manifest-webpack-plugin';

interface CompilationModule extends Module {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resource?: string | any[];
}

function getEntryResources(module: CompilationModule | undefined): string[] {
  const resources: Array<string> = [];

  if (module && typeof module.resource === 'string') {
    resources.push(module.resource);
  }

  return resources;
}

function collectEntryResources(
  compilation: Compilation,
  module: CompilationModule,
  cache: Array<ReturnType<typeof getEntryResources>>
): ReturnType<typeof getEntryResources> {
  const hasModuleGraphSupport = Object.prototype.hasOwnProperty.call(
    compilation,
    'moduleGraph'
  );
  // index of module is unique per compilation
  // module.id can be null, not used here
  const index = hasModuleGraphSupport
    ? compilation.moduleGraph.getPreOrderIndex(module as never) ?? 1
    : 1;

  // get from cache
  if (cache[index] !== undefined) {
    return cache[index];
  }

  if (module && typeof module.resource === 'string') {
    cache[index] = getEntryResources(module);

    return cache[index];
  }

  const resources: ReturnType<typeof getEntryResources> = [];

  // if the json file is imported using a javascript file
  // will need to go through dependencies to extract the resources
  if (module && module.dependencies) {
    module.dependencies.forEach((dep) => {
      if (dep) {
        const depModule: Module | null = hasModuleGraphSupport
          ? compilation.moduleGraph.getModule(dep)
          : dep.module;

        const originModule: Module | null | undefined = hasModuleGraphSupport
          ? compilation.moduleGraph.getParentModule(dep)
          : (dep as Dependency & {originModule: Module}).originModule;

        const nextModule = depModule || originModule;
        if (nextModule) {
          const depResources = collectEntryResources(
            compilation,
            nextModule,
            cache
          );

          for (let i = 0; i < depResources.length; i += 1) {
            resources.push(depResources[i]);
          }
        }
      }
    });
  }

  cache[index] = resources;

  return resources;
}

export class WextManifestWebpackPlugin {
  // Define `apply` as its prototype method which is supplied with compiler as its argument
  apply(compiler: Compiler): void {
    const {hooks} = compiler;
    if (hooks) {
      // Runs plugin after a compilation has been created.
      hooks.compilation.tap(PLUGIN_NAME, (compilation) => {
        const resourcesCache: Array<ReturnType<typeof getEntryResources>> = [];

        // Triggered when an asset from a chunk was added to the compilation.
        compilation.hooks.chunkAsset.tap(PLUGIN_NAME, (chunk, file: string) => {
          const hasChunkGraphSupport = Object.prototype.hasOwnProperty.call(
            compilation,
            'chunkGraph'
          );

          // Only handle js files with entry modules
          if (
            !file.endsWith('.js') ||
            (hasChunkGraphSupport &&
              compilation.chunkGraph.getNumberOfEntryModules(chunk) < 1)
          ) {
            return;
          }

          const entryModules: Array<Module> = hasChunkGraphSupport
            ? Array.from(
                compilation.chunkGraph.getChunkEntryModulesIterable(chunk)
              )
            : [chunk.entryModule];
          if (entryModules.length < 1) {
            return;
          }

          const entryModule = entryModules[0];
          const resources = collectEntryResources(
            compilation,
            entryModule,
            resourcesCache
          );

          const isManifest: boolean = resources.every(
            (resource) => resource && /manifest\.json$/.test(resource)
          );

          if (isManifest) {
            if (Array.isArray(chunk.files)) {
              chunk.files = chunk.files.filter((f: string): boolean => {
                return f !== file;
              }) as never;
            } else if (chunk.files instanceof Set) {
              chunk.files.delete(file);
            }

            delete compilation.assets[file];
            console.log(`${PLUGIN_NAME}: removed ${file}`);
          }
        });
      });
    }
  }
}
