let staffList = getStaffList()
renderTable(staffList)
//1. In ra table dánh sách nhân viên
getElement("#btnThemNV").addEventListener("click", () => {
    debugger
    let id = +getElement("#tknv").value;
    let name = getElement("#name").value;
    let email = getElement("#email").value;
    let password = getElement("#password").value;
    let date = getElement("#datepicker").value;
    let basicSalary = +getElement("#luongCB").value;
    let position = getElement("#chucvu").value;
    let hourInMonth = +getElement("#gioLam").value;

    let isValid = validate()
    if (!isValid) {
        return;
    }


    const staff = new User(id, name, email, password, date, basicSalary, position, hourInMonth)
    staffList.push(staff);

    renderTable(staffList)
    storageStaffList()
    reset()



})
function reset() {
    getElement("#tknv").value = "";
    getElement("#name").value = "";
    getElement("#email").value = "";
    getElement("#password").value = "";
    getElement("#datepicker").value = "";
    getElement("#luongCB").value = "";
    getElement("#chucvu").value = "";
    getElement("#gioLam").value = "";
    resetNoti()
}
function reload() {
    staffList = []
    localStorage.clear()
    renderTable(staffList)
    getElement("#tknv").disabled = false;
    getElement("#btnThemNV").disabled = false;
    getElement("#btnDong").disabled = false;
    getElement("#btnCapNhat").disabled = false;

}
function search() {
    let searchValue = getElement("#searchName").value
    let newStaffList = staffList.filter((staff) => {
        let grade = staff.grade()
        grade = grade.toLowerCase();
        return grade.indexOf(searchValue.toLowerCase()) !== -1;
    })
    renderTable(newStaffList);
}
function deleteStaff(id) {
    staffList = staffList.filter((staff) => {
        return staff.id != id;
    })
    renderTable(staffList)
    storageStaffList()


}
function editstaff(id) {
    let selecStaff = staffList.find((staff) => staff.id === id)
    getElement("#tknv").value = selecStaff.id;
    getElement("#name").value = selecStaff.name;
    getElement("#email").value = selecStaff.email;
    getElement("#password").value = selecStaff.password;
    getElement("#datepicker").value = selecStaff.date;
    getElement("#luongCB").value = selecStaff.basicSalary;
    getElement("#chucvu").value = selecStaff.position;
    getElement("#gioLam").value = selecStaff.hourInMonth;
    getElement("#tknv").disabled = true;
    getElement("#btnThemNV").disabled = true;
    getElement("#btnDong").disabled = true;
    getElement("#btnCapNhat").disabled = false;

    resetNoti()







}
function update() {
    let id = +getElement("#tknv").value
    debugger
    let index = staffList.findIndex((staff) => staff.id === id)
    staffList[index].name = getElement("#name").value
    staffList[index].email = getElement("#email").value
    staffList[index].password = getElement("#password").value
    staffList[index].date = getElement("#datepicker").value
    staffList[index].basicSalary = +getElement("#luongCB").value
    staffList[index].position = getElement("#chucvu").value
    staffList[index].hourInMonth = +getElement("#gioLam").value


    let isValid = validate()
    if (!isValid) {
        return;
    }
    renderTable(staffList)
    getElement("#tknv").disabled = false;
    getElement("#btnThemNV").disabled = false;
    storageStaffList()


}
function renderTable(staffList) {
    let html = staffList.reduce((output, staff) => output + `
    <tr>
    <td>${staff.id}</td>       
    <td>${staff.name}</td>       
    <td>${staff.email}</td>       
    <td>${staff.date}</td>       
    <td>${staff.position}</td>       
    <td>${staff.calcSalary()}</td>   
    <td>${staff.grade()}</td>   
    <td>
       <button class="btn btn-primary" 
       data-toggle="modal"  data-target="#myModal"
       onclick="editstaff(${staff.id})">
        <i class="fa fa-edit"></i>
        </button>
       <button class="btn btn-danger" 
       onclick="deleteStaff(${staff.id})">
        <i class="fa fa-trash"></i>
        </button>
    </td> 
    `, "")
    getElement("#tableDanhSach").innerHTML = html
}
function storageStaffList() {
    let json = JSON.stringify(staffList)
    localStorage.setItem("staffList", json)
}
function getStaffList() {
    const json = localStorage.getItem("staffList");
    if (!json) {
        return [];
    }

    const staffList = JSON.parse(json);
    for (let i = 0; i < staffList.length; i++) {
        let staff = staffList[i]
        staffList[i] = new User(
            staff.id,
            staff.name,
            staff.email,
            staff.password,
            staff.date,
            staff.basicSalary,
            staff.position,
            staff.hourInMonth
        )
    }
    return staffList;

}

function addStaff() {
    reset()
    document.querySelector("#btnCapNhat").disabled = true;
}

//===================================================================================
// VARIABLE
function validate() {
    let isValid = true;





    let id = getElement("#tknv").value;
    let idValid = false;
    for (let i = 0; i < staffList.length; i++) {
        if (staffList[i].id===Number(id)){
            idValid=true;
        }
    }
    if (!id.trim()) {
        isValid = false;
        getElement("#tbTKNV").innerHTML = "Tài khoản không được bỏ trống";
    } else if (id.length < 4 || id.length > 6) {
        isValid = false;
        getElement("#tbTKNV").innerHTML = "Tài khoản phải trong khoảng 4-6 ký tự";
    } else if(idValid){
        getElement("#tbTKNV").innerHTML = "Tài khoản đã tồn tại";
    } else {
        getElement("#tbTKNV").innerHTML = "";
    }

    let name = getElement("#name").value;
    if (!name.trim()) {
        isValid = false;
        getElement("#tbTen").innerHTML = "Tên không được bỏ trống";
    } else if (!(/^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/.test(name))) {
        isValid = false;
        getElement("#tbTen").innerHTML = "Tên không hợp lệ";
    } else {
        getElement("#tbTen").innerHTML = "";
    }

    let email = getElement("#email").value
    if (!email.trim()) {
        isValid = false;
        getElement("#tbEmail").innerHTML = "Email NV không được để trống";
    } else if (!/^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
        isValid = false;
        getElement("#tbEmail").innerHTML = "Email chưa đúng định dạng";
    } else {
        getElement("#tbEmail").innerHTML = "";
    }


    let passsword = getElement("#password").value
    if (!passsword.trim()) {
        isValid = false;
        getElement("#tbMatKhau").innerHTML = "Mật khẩu không được để trống"
    } else if (passsword.length < 6 || passsword.length > 10) {
        isValid = false;
        getElement("#tbMatKhau").innerHTML = "Mật khẩu phải trong khoảng 6-10 ký tự";
    }
    else if (!/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,10})/.test(passsword)) {
        isValid = false;
        getElement("#tbMatKhau").innerHTML = "Mật khẩu chưa đúng định dạng";
    } else {
        getElement("#tbMatKhau").innerHTML = "";
    }



    let date = getElement("#datepicker").value
    if (!date.trim()) {
        isValid = false;
        getElement("#tbNgay").innerHTML = "Ngày không được để trống"
    } else if (!/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(date)) {
        isValid = false;
        getElement("#tbNgay").innerHTML = "Ngày chưa đúng định dạng";
    } else {
        getElement("#tbNgay").innerHTML = "";
    }

    let basicSalary = getElement("#luongCB").value
    if (!basicSalary.trim()) {
        isValid = false;
        getElement("#tbLuongCB").innerHTML = "Lương không được để trống"
    } else {
        getElement("#tbLuongCB").innerHTML = "";
    }
    let position = getElement("#chucvu").value
    if (((!position.trim())) || (position === "Chọn chức vụ")) {
        isValid = false;
        getElement("#tbChucVu").innerHTML = "Chưa chọn chức vụ"
    } else {
        getElement("#tbChucVu").innerHTML = "";
    }

    let hourInMonth = getElement("#gioLam").value
    if (!hourInMonth.trim()) {
        isValid = false;
        getElement("#tbGiolam").innerHTML = "Lương không được để trống"
    } else {
        getElement("#tbGiolam").innerHTML = "";
    }

    return isValid
}

function resetNoti() {
    getElement("#tbTKNV").innerHTML = "";
    getElement("#tbTen").innerHTML = "";
    getElement("#tbEmail").innerHTML = "";
    getElement("#tbMatKhau").innerHTML = "";
    getElement("#tbNgay").innerHTML = "";
    getElement("#tbLuongCB").innerHTML = "";
    getElement("#tbChucVu").innerHTML = "";
    getElement("#tbGiolam").innerHTML = "";
}