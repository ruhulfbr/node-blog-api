class ServiceResultType {
    static DATA = 1;
    static META = 2;
    static JSON = 3;
    static DELETE = 4;
    static ERROR = 5;

    static getLabel(type) {
        switch (type) {
            case ServiceResultType.DATA:
                return "data";
            case ServiceResultType.META:
                return "meta";
            case ServiceResultType.JSON:
                return "json";
            case ServiceResultType.DELETE:
                return "delete";
            case ServiceResultType.ERROR:
                return "error";
            default:
                throw new Error("Invalid service result type");
        }
    }
}

// Freeze the object to prevent modifications
Object.freeze(ServiceResultType);

module.exports = ServiceResultType;
