// 自动引入naive-ui 组件
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

export function createAutoImport() {
  return AutoImport({
    imports: [
      'vue',
      {
        'naive-ui': [
          'useDialog',
          'useMessage',
          'useNotification',
          'useLoadingBar'
        ]
      }
    ]
  })
};

export function createAutoImportComponents() {
  return Components({
    resolvers: [NaiveUiResolver()]
  })
}
