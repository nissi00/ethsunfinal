import bcrypt from 'bcrypt';

async function generateHash() {
  const password = 'MonSuperMotDePasse'; // mets le mot de passe que tu veux
  const hash = await bcrypt.hash(password, 10);
  console.log('Hash généré :', hash);
}

generateHash();
