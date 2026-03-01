class UserModel {
  constructor(user) {
    this.userId = user.user_id;
    this.username = user.username;
    this.email = user.email;
    this.passwordHash = user.password_hash;
    this.createdAt = user.created_at;
    this.phoneNumber = user.phone_number;
    this.role = user.role; // Consumer, Business, or Platform Admin
  }

  // Standardization for JSON Payload Keys
  toResponse() {
    return {
      userId: this.userId,
      username: this.username,
      email: this.email,
      phoneNumber: this.phoneNumber,
      role: this.role,
      createdAt: this.createdAt
    };
  }
}

module.exports = UserModel;