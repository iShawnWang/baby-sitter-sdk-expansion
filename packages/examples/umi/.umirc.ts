import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'all',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
  esbuild: {target: 'es5'},
  devtool: 'source-map',
  targets: { ie: 11 },
});
