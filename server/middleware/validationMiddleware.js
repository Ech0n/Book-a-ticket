import createError from 'http-errors';

export const validateSchema = (data, schema) => {
    const result = schema.safeParse(data);

    if (!result.success) {
        const errors = Object.fromEntries(
            result.error.issues.map((issue) => [issue.path[0], issue.message]),
        );
        throw createError(400, 'Validation Error', { errors });
    }

    return result.data;
};
