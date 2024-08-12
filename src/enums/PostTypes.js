class PostType {
    static TINY = 1;
    static MEDIUM = 2;
    static REGULAR = 3;

    static getLabel(type) {
        switch (type) {
            case PostType.TINY:
                return "Tiny";
            case PostType.MEDIUM:
                return "Medium";
            case PostType.REGULAR:
                return "Regular";
            default:
                throw new Error("Invalid post type");
        }
    }
}

// Freeze the object to prevent modifications
Object.freeze(PostType);

module.exports = PostType;
