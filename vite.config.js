import { env } from 'node:process';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import VitePluginSvgSpritemap from '@spiriit/vite-plugin-svg-spritemap';
// import { ViteMinifyPlugin } from 'vite-plugin-minify';

/** @type {import('vite').UserConfig} */
export default {
  plugins: [
    VitePluginSvgSpritemap('source/img/sprite/*.svg', {
      styles: false,
      injectSVGOnDev: true,
    }),
    ViteImageOptimizer({
      test: /\.(jpe?g|png|svg)$/i,
      includePublic: false,
      logStats: true,
      ansiColors: true,
      svg: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                cleanupNumericValues: false,
                convertPathData: {
                  floatPrecision: 2,
                  forceAbsolutePath: false,
                  utilizeAbsolute: false,
                },
                removeViewBox: false, 
                cleanupIds: false,
              },
            },
          },
          'removeDimensions',
        ],
      },
      png: {
        quality: 80,
        palette: true
      },
      jpeg: {
        quality: 80,
        progressive: true
      },
      jpg: {
        quality: 80,
        progressive: true
      },
      cache: true,
      cacheLocation: './.cache',
    }),
  ],
  css: {
    devSourcemap: true
  },
  publicDir: 'public',
  root: './source',
  build: {
    outDir: '../dist',
  },
  base: !env.CI ? '/' : `/${env.REPO_NAME}/`,
  server: {
    port: 3000,
  }
};
