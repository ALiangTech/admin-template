// 该脚本主要是用来做主要版本升级 也就是说 不兼容升级x的版本
import { spawn } from 'child_process'

interface PackageItem {
  packageName: string;
  currentVersion: string;
  latestVersion: string;
}

// 运行pnpm outdated 命令获取需要升级的包和升级的版本 
const up = spawn('pnpm', ['outdated'])

up.stdout.on('data', (data) => {
  const lines = `${data}`.split('\n');
  // 用于存储包信息的数组
  const packages: PackageItem[] = [];

  // 从第3行开始，因为前两行是表头
  for (let i = 3; i < lines.length - 1; i++) {
    const line = lines[i].trim();
    if (line) {
      const [packageName, currentVersion, latestVersion] = line.split('│').filter(v => v);
      latestVersion && packages.push({
        packageName: packageName.trim().split(' (dev)')[0],
        currentVersion: currentVersion.trim(),
        latestVersion: latestVersion.trim(),
      });
    }
  }

  function* packageGenerator() {
    const length = packages.length;
    for (let i = 0; i < length; i++) {
      const { packageName, latestVersion } = packages[i];
      const command = `${packageName}@${latestVersion}`;
      yield excuteUpdate(packageName, command)
    }
  }
  const generator = packageGenerator();

  async function execute() {
    try {
      for await (const g of generator) {
        console.log(g)
      }
    } catch (error) {
      console.error(error)
    }
  }
  execute();
});

function excuteUpdate(packageName: string, command: string) {
  return new Promise((resolve, rejects) => {
    const upp = spawn('pnpm', ['up', command], { shell: true })
    console.log(`npm包${packageName}`, '安装中...')
    upp.on('close', (code) => {
      const msg = code ? '失败' : '成功'
      resolve(`npm包${packageName}${msg} \n`)
    });
    upp.stderr.on('data', (data) => {
      rejects(new Error(`stderr: ${packageName} 安装失败 ${data}`))
    });
  })
}
