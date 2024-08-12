class UserRole {
    static ADMIN = 1;
    static USER = 0;

    static getLabel(role) {
        switch (role) {
            case UserRole.ADMIN:
                return "Admin";
            case UserRole.USER:
                return "User";
            default:
                throw new Error("Invalid user role");
        }
    }
}

// Freeze the object to prevent modifications
Object.freeze(UserRole);

module.exports = UserRole;
