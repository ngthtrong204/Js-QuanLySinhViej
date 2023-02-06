function getElement(selecter) {
    return document.querySelector(selecter);
}
class User {
    constructor(id, name, email, password, date, basicSalary, position, hourInMonth) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.date = date;
        this.basicSalary = basicSalary;
        this.position = position;
        this.hourInMonth = hourInMonth;
    }
}

User.prototype.calcSalary = function () {
    let position = this.position
    if (position === "Sếp") {
        return this.basicSalary * 3 * this.hourInMonth
    }
    if (position === "Trưởng phòng") {
        return this.basicSalary * 2 * this.hourInMonth
    }
    if (position === "Nhân viên") {
        return this.basicSalary * this.hourInMonth
    }
}

User.prototype.grade = function () {
    let hourInMonth = this.hourInMonth;
    if (hourInMonth >= 192) {
        return "Nhân viên xuất sắc"
    }
    if (hourInMonth >= 176) {
        return "Nhân viên giỏi"
    }
    if (hourInMonth >= 160) {
        return "Nhân viên khá"
    }
    if (hourInMonth < 160) {
        return "Nhân viên trung bình"
    }
}