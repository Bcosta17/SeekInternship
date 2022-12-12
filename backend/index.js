import  express  from 'express';
import cors from 'cors';
import http from 'http'


// Routes
import AlunoRoutes from './routes/AlunoRoutes.js';
import EmpresaRoutes from './routes/EmpresaRoutes.js';
import VagaRoutes from './routes/VagaRoutes.js'; 
import LoginRoutes from './routes/LoginRoutes.js'; 
import PasswordRecoveryRoutes from './routes/PasswordRecoveryRoutes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({credentials: true, origin: 'https://seekinternship-4f46.web.app'}));

// Routes
app.use('/alunos', AlunoRoutes);
app.use('/empresas', EmpresaRoutes);
app.use('/vagas', VagaRoutes);
app.use('/login', LoginRoutes);
app.use('/recoveryPassword',PasswordRecoveryRoutes);


const httpServer = http.createServer(app);

httpServer.listen(5000, () => {
	console.log('Servidor HTTP rodando na porta 5000');
});

