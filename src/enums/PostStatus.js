class PostStatus {
    static PENDING = 0;
    static PUBLISHED = 1;
    static UNPUBLISHED = 2;
    static DECLINED = 3;

    static getLabel(status) {
        switch (status) {
            case PostStatus.PENDING:
                return "Pending";
            case PostStatus.PUBLISHED:
                return "Published";
            case PostStatus.UNPUBLISHED:
                return "Unpublished";
            case PostStatus.DECLINED:
                return "Declined";
            default:
                throw new Error("Invalid status");
        }
    }
}

// Freeze the object to prevent modifications
Object.freeze(PostStatus);

module.exports = PostStatus;
