class UserStatus {
    static ACTIVE = 1;
    static INACTIVE = 0;

    static getLabel(status) {
        switch (status) {
            case UserStatus.ACTIVE:
                return "Active";
            case UserStatus.INACTIVE:
                return "Inactive";
            default:
                throw new Error("Invalid user status");
        }
    }
}

// Freeze the object to prevent modifications
Object.freeze(UserStatus);

module.exports = UserStatus;
