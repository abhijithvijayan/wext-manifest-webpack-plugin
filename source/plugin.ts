/* eslint-disable import/no-extraneous-dependencies */

/**
 *  wext-manifest-webpack-plugin
 *
 *  @author   abhijithvijayan <abhijithvijayan.in>
 *  @license  MIT License
 */

import 'emoji-log';
import {Compiler, compilation as compilationType} from 'webpack';

const PLUGIN_NAME = 'wext-manifest-webpack-plugin';

type Compilation = compilationType.Compilation;
type Module = compilationType.Module;
type Chunk = compilationType.Chunk;

interface CompilationModule extends Module {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resource?: string | any[];
}

function getEntryResource(
  module: CompilationModule | undefined
): string | null {
  const resource: string | null = null;

  if (module && typeof module.resource === 'string') {
    return module.resource;
  }

  return resource;
}

export class WextManifestWebpackPlugin {
  // Define `apply` as its prototype method which is supplied with compiler as its argument
  apply(compiler: Compiler): void {
    /**
     *  webpack 4+ comes with a new plugin system.
     *
     *  (// ToDo: support old plugin system //)
     */
    const {hooks} = compiler;

    // Check for hooks for 4+
    if (hooks) {
      // Runs plugin after a compilation has been created.
      hooks.compilation.tap(PLUGIN_NAME, (compilation: Compilation) => {
        // Triggered when an asset from a chunk was added to the compilation.
        compilation.hooks.chunkAsset.tap(
          PLUGIN_NAME,
          (chunk: Chunk, file: string) => {
            // Only handle js files with entry modules
            if (!file.endsWith('.js') || !chunk.hasEntryModule()) {
              return;
            }

            // Returns path containing name of asset
            const resource: null | string = getEntryResource(chunk.entryModule);
            const isManifest: boolean =
              (resource && /manifest\.json$/.test(resource)) || false;

            if (isManifest) {
              chunk.files = chunk.files.filter((f: string): boolean => {
                return f !== file;
              });

              delete compilation.assets[file];
              // https://github.com/abhijithvijayan/wext-manifest-webpack-plugin/issues/1
              // console.emoji('🦄', `${PLUGIN_NAME}: removed ${file}`, 29);
              console.log(`${PLUGIN_NAME}: removed ${file}`);
            }
          }
        );
      });
    }
  }
}
