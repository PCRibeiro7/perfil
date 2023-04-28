import { User, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserRepository {
    static async getAllUsers(): Promise<User[]> {
        return await prisma.user.findMany();
    }

    static async createUsers(users: User[]): Promise<BatchPayload> {
        return await prisma.user.createMany({ data: users });
    }
}
