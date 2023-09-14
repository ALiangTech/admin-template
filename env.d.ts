/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string; // 接口地址前缀 统一配置
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
