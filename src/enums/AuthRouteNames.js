class AuthRouteNames {
    static REGISTER = "register";
    static LOGIN = "login";
    static FORGOT_PASSWORD = "password.email";
    static RESET_PASSWORD = "reset-password";
    static VERIFY_EMAIL = "verification.verify";
    static EMAIL_VERIFY_NOTIFICATION = "verification.send";
    static LOGOUT = "logout";

    static getResourceType(route) {
        switch (route) {
            case AuthRouteNames.REGISTER:
                return "register";
            case AuthRouteNames.LOGIN:
                return "token";
            case AuthRouteNames.FORGOT_PASSWORD:
            case AuthRouteNames.RESET_PASSWORD:
                return "reset-password";
            case AuthRouteNames.VERIFY_EMAIL:
            case AuthRouteNames.EMAIL_VERIFY_NOTIFICATION:
                return "verify-email";
            case AuthRouteNames.LOGOUT:
                return "logout";
            default:
                throw new Error("Invalid route name");
        }
    }
}

// Freeze the object to prevent modifications
Object.freeze(AuthRouteNames);

module.exports = AuthRouteNames;
