let staffList = getStaffList()
renderTable(staffList)





//1. In ra table dánh sách nhân viên
getElement("#btnThemNV").addEventListener("click", () => {

    let id = getElement("#tknv").value;
    let name = getElement("#name").value;
    let email = getElement("#email").value;
    let password = getElement("#password").value;
    let date = getElement("#datepicker").value;
    let basicSalary = +getElement("#luongCB").value;
    let position = getElement("#chucvu").value;
    let hourInMonth = +getElement("#gioLam").value;

    const staff = new User(id, name, email, password, date, basicSalary, position, hourInMonth)
    staffList.push(staff);

    renderTable(staffList)
    storageStaffList()
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
       <button class="btn btn-primary" onclick="editstaff(${staff.id})"><i class="fa fa-edit"></i></button>
       <button class="btn btn-danger" onclick="deletestaff(${staff.id})"><i class="fa fa-trash"></i></button>
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
        staffList[i] = new User(
            staffList[i].id,
            staffList[i].name,
            staffList[i].email,
            staffList[i].password,
            staffList[i].date,
            staffList[i].basicSalary,
            staffList[i].position,
            staffList[i].hourInMonth
        )
    }
    return staffList;

}