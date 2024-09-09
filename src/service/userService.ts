export class UserService {
  public static getData() {
    const userId: number = Math.floor(Math.random() * 100);
    return {
      id: userId,
      name: `User ${userId}`,
      email: `user_${userId}@email.com`,
    };
  }
}