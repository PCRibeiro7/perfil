import { User } from '@prisma/client';
import axiosInstance from '.';

let pending = Promise.resolve();

// A seen-card write must finish before an answer can update the same profile.
export function mutateUser(
    userId: string,
    data?: Partial<User>,
    method: 'put' | 'delete' = 'put',
) {
    const request = pending.then(() =>
        axiosInstance.request<User>({
            method,
            url: `/api/users/${userId}`,
            data,
        }),
    );
    pending = request.then(
        () => undefined,
        () => undefined,
    );
    return request;
}
