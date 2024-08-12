const { categoryService } = require("../services");

const validateCategories = async (req, res, next) => {
    const { categoryIds } = req.body;

    const { message } = await categoryService.getAll();

    const validIds = message.map((category) => category.id);

    if (
        categoryIds
            .map((category) => validIds.includes(category))
            .includes(false)
    ) {
        return res
            .status(400)
            .json({ message: 'one or more "categoryIds" not found' });
    }

    next();
};

module.exports = validateCategories;
