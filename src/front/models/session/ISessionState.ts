import { User } from '@prisma/client';

export default interface ISessionState {
    user: User;
}
