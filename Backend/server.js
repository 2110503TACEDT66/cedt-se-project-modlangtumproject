const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const { xss } = require('express-xss-sanitizer');
const rateLimit = require('express-rate-limit');

const company = require('./routes/companyRoutes');
const session = require('./routes/sessionRoutes');
const user = require('./routes/userRoutes');
const job = require('./routes/jobRoutes');
const hpp = require('hpp');
const cors = require('cors');

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(cors({
  origin: ['http://localhost:3000', 'http://modlang_frontend:3000']
}));

const limiter = rateLimit({
  windowsMs: 10 * 60 * 1000, //10 mins
  max: 50,
});
app.use(limiter);

app.get('/', (req, res) => res.send('Express on Vercel'));
app.use('/company', company);
app.use('/auth', user);
app.use('/sessions', session);
app.use('/uploads', express.static('uploads'));
app.use('/job', job);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.HOST} mode on port ${PORT}`),
);

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Job Fair API',
      version: '1.0.0',
      description: 'Job Fair API Information',
    },
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            name: { type: 'string', required: true },
            tel: { type: 'string', required: true },
            email: { type: 'string', required: true },
            password: { type: 'string', required: true },
            role: { type: 'string' },
            profile: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./controllers/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// eslint-disable-next-line
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});

module.exports = app;
