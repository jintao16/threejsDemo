// scripts/generate-routes.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const viewsDirUrl = new URL('./src/views', import.meta.url);
const viewsDir = fileURLToPath(viewsDirUrl);

const routes = fs.readdirSync(viewsDir)
  .filter(file => file.endsWith('.vue'))
  .map(file => {
    const routeName = file.replace('.vue', '');
    return `{ path: '/${routeName}',name:'${routeName}', component: () => import('@/views/${routeName}.vue') }`;
  });

const routesConfig = `export default [${routes.join(',\n')}]`;

const scriptPath = fileURLToPath(import.meta.url);
const outputFilePath = path.join(path.dirname(scriptPath), 'src/router/auto-generated-routes.js');

fs.writeFileSync(outputFilePath, routesConfig);