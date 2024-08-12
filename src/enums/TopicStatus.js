class TopicStatus {
    static ACTIVE = 1;
    static INACTIVE = 0;

    static getLabel(status) {
        switch (status) {
            case TopicStatus.ACTIVE:
                return "Active";
            case TopicStatus.INACTIVE:
                return "Inactive";
            default:
                throw new Error("Invalid topic status");
        }
    }
}

// Freeze the object to prevent modifications
Object.freeze(TopicStatus);

module.exports = TopicStatus;
