/* eslint-disable import/no-extraneous-dependencies */
/**
 *  @author abhijithvijayan <abhijithvijayan.in>
 */

import webpack from 'webpack';

const PLUGIN_NAME = 'wext-manifest-webpack-plugin';

interface CompilationModule extends webpack.compilation.Module {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	resource?: string | any[];
}

function getEntryResource(module: CompilationModule | undefined): string | null {
	const resource: string | null = null;

	if (module && typeof module.resource === 'string') {
		return module.resource;
	}

	return resource;
}

export class WextManifestWebpackPlugin {
	// Define `apply` as its prototype method which is supplied with compiler as its argument
	apply(compiler: webpack.Compiler): void {
		// Runs plugin after a compilation has been created.
		compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation: webpack.compilation.Compilation) => {
			// Triggered when an asset from a chunk was added to the compilation.
			compilation.hooks.chunkAsset.tap(PLUGIN_NAME, (chunk: webpack.compilation.Chunk, file: string) => {
				// Only handle js files with entry modules
				if (!file.endsWith('.js') || !chunk.hasEntryModule()) {
					return;
				}

				// Returns path containing name of asset
				const resource: null | string = getEntryResource(chunk.entryModule);
				const isManifest: boolean = (resource && /manifest\.json$/.test(resource)) || false;

				if (isManifest) {
					chunk.files = chunk.files.filter((f) => {
						return f !== file;
					});

					delete compilation.assets[file];
					console.error(`${PLUGIN_NAME}: Removed js from manifest module: ${file}`);
				}
			});
		});
	}
}
