import { User, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserRepository {
    static async createNewUser(): Promise<User> {
        return await prisma.user.create({ data: {} });
    }

    static async getUserById(id: string): Promise<User | null> {
        return await prisma.user.findUnique({ where: { id } });
    }

    static async getAllUsers(): Promise<User[]> {
        return await prisma.user.findMany();
    }

    static async createUsers(users: User[]) {
        return await prisma.user.createMany({ data: users });
    }
}
