git clone https://github.com/shitiz087/gadget-backend.git && cd gadget-backend
npm install
add .env # set PORT, JWT_SECRET, ENCRYPTION_KEY
npx sequelize-cli db:migrate
npm run dev
