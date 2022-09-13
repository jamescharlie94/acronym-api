import App from '@/app';
import AcronymsRoute from '@routes/acronyms.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new AcronymsRoute()]);

app.listen();
