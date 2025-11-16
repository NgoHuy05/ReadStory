import slugify from "slugify"

export function slugMiddleware(schema, nameField) {
    schema.pre('save', function (next) {
        if (this.isModified(nameField)) {
            this.slug = slugify(this[nameField], { lower: true, strict: true, locale: 'vi' });
        }
        next();
    })

    schema.pre('findOneAndUpdate', function (next) {
        const update = this.getUpdate();
        if (update[nameField]) {
            update.slug = slugify(update[nameField], { lower: true, strict: true, locale: 'vi' });
            this.setUpdate(update);
        }
        next();
    })
}