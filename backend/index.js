import  express  from 'express';
import cors from 'cors';

// Routes
import AlunoRoutes from './routes/AlunoRoutes.js';
import EmpresaRoutes from './routes/EmpresaRoutes.js';

const app = express();

app.use(express.json());

app.use(cors({credentials: true, origin: 'http://localhost:4200'}));

// Routes
app.use('/alunos', AlunoRoutes);
app.use('/empresas', EmpresaRoutes);

app.listen(5000);