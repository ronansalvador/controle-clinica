#!/bin/bash

# acessar pasta backend e executar npm run dev
cd backend
npm run db:reset
npm run dev &
cd ..

# acessar pasta frontend e executar npm start
cd frontend
npm run start
