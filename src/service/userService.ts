export class UserService {
  public static async getData(userId: string) {
    return {
      id: userId,
      name: `User ${userId}`,
      email: `user_${userId}@email.com`,
    };
  }
}