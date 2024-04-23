// в чем разница между export и exports ??
module.exports = class UserDto {
    id;
    name;
    email;
    email_confirmed;
    role;

    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.email = model.email;
        this.email_confirmed = model.email_confirmed;
        this.role = model.role;
    }
}