import  express  from 'express';
import cors from 'cors';

// Routes
import AlunoRoutes from './routes/AlunoRoutes.js';
import EmpresaRoutes from './routes/EmpresaRoutes.js';
import VagaRoutes from './routes/VagaRoutes.js'; 
import LoginRoutes from './routes/LoginRoutes.js'; 

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({credentials: true, origin: 'http://localhost:4200'}));

// Routes
app.use('/alunos', AlunoRoutes);
app.use('/empresas', EmpresaRoutes);
app.use('/vagas', VagaRoutes);
app.use('/login', LoginRoutes);


app.listen(5000);