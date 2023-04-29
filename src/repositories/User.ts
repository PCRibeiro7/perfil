import mergeTwoArrays from '@/utils/mergeTwoArrays';
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

    static async deleteUserById(id: string): Promise<User> {
        return await prisma.user.delete({ where: { id } });
    }

    static async updateUserById(id: string, data: User): Promise<User> {
        const oldUser = await prisma.user.findUnique({ where: { id } });

        const newUser: Partial<User> = {
            ...oldUser,
            ...data,
        };
        newUser.seenCardIds = mergeTwoArrays(
            oldUser?.seenCardIds,
            data.seenCardIds,
        );
        newUser.correctCardIds = mergeTwoArrays(
            oldUser?.correctCardIds,
            data.correctCardIds,
        );
        newUser.skippedCardIds = mergeTwoArrays(
            oldUser?.skippedCardIds,
            data.skippedCardIds,
        );
        delete newUser.id;
        return await prisma.user.update({ where: { id }, data: newUser });
    }
}
