import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
  const hashedPassword = await bcrypt.hash('MonSuperMotDePasse', 10);
  await prisma.user.create({
    data: {
      email: 'admin@ethsun-oxford.uk',
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
    },
  });
  console.log('Admin créé avec succès !');
};

main().finally(() => prisma.$disconnect());
