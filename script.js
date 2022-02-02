const students = [
    {
        name: "Joe Rottman",
        grade: 42,
        hobbies: ["Math", "History", "Soccer"],
        emojis: [":)", ":(", "<3"]
    },
    {
        name: "Alice Tandrine",
        grade: 12,
        hobbies: ["Swimming", "Tennis", "Piano"],
        emojis: [":)", ":("]
    },
    {
        name: "Joel Jun",
        grade: 72,
        hobbies: ["Literature", "Badminton", "Piano"],
        emojis: [":)", "<3"]
    },
    {
        name: "Noah Rogan",
        grade: 2,
        hobbies: ["Singing", "Swimming", "Piano"],
        emojis: ["<3"]
    },
    {
        name: "Albert Einstein",
        grade: 100,
        hobbies: ["Judo", "Singing"],
        emojis: [":(", "<3"]
    },
    {
        name: "Roger Ferguson",
        grade: 98,
        hobbies: ["Music", "Swimming"],
        emojis: [":)"]
    },
    {
        name: "Tim Galen",
        grade: 100,
        hobbies: ["Guitar", "Hoop", "Surf"],
        emojis: [":)"]
    },
    {
        name: "Tara Galen",
        grade: 89,
        hobbies: ["Swimming", "Hoop", "Music"],
        emojis: [":)"]
    }
];

const studentsSpread = [...students];

const mapEmojis = [
    // map emojis
    { emotion: ":)", ref: "😊" },
    { emotion: ":(", ref: "😔" },
    { emotion: "<3", ref: "🧡" }
];
let firstNameClickCount = 0;
let lastNameClickCount = 0;
let gradeClickCount = 0;

let convertStrToEmoji = (emojiArrOfStr) => {
    const emojiFinalArr = [];
    emojiArrOfStr.forEach((emojiStr) => {
        mapEmojis.forEach((emotionObj) => {
            if (emojiStr === Object.values(emotionObj)[0]) {
                emojiFinalArr.push(Object.values(emotionObj)[1]);
            }
        });
    });
    return emojiFinalArr;
};

let clearTextFields = () => {
    document.getElementById("nameInput").value = "";
    document.getElementById("minGradeInput").value = "";
    document.getElementById("maxGradeInput").value = "";
};

let deleteRows = () => {
    // deletes all rows except header row
    let rowCount = studentTable.rows.length;
    for (let i = rowCount - 1; i > 0; i--) {
        studentTable.deleteRow(i);
    }
};
let loadTable = (studentsArr) => {
    // set to onload in html

    let table = document.getElementById("studentTable");

    deleteRows();

    studentsArr.forEach((stu) => {
        let row = document.createElement("tr");
        let firstnameCell = document.createElement("td");
        let textNodeFN = document.createTextNode(stu.name.split(" ")[0]);
        firstnameCell.appendChild(textNodeFN);
        row.appendChild(firstnameCell);

        let lastnameCell = document.createElement("td");
        let textNodeLN = document.createTextNode(stu.name.split(" ")[1]);
        lastnameCell.appendChild(textNodeLN);
        row.appendChild(lastnameCell);

        let gradeCell = document.createElement("td");
        let textNodeG = document.createTextNode(stu.grade);
        gradeCell.appendChild(textNodeG);
        row.appendChild(gradeCell);

        let hobbiesCell = document.createElement("td");
        let textNodeH = document.createTextNode(stu.hobbies.join(", "));
        hobbiesCell.appendChild(textNodeH);
        row.appendChild(hobbiesCell);

        let emojisCell = document.createElement("td");
        let textNodeE = document.createTextNode(convertStrToEmoji(stu.emojis).join(", "));
        emojisCell.appendChild(textNodeE);
        row.appendChild(emojisCell);

        table.appendChild(row);
    });
};

let filterByGradeRange = (student) => {
    // helper function for filter method
    let min = -Infinity;
    let max = Infinity;
    if (parseInt(document.getElementById("minGradeInput").value)) {
        min = parseInt(document.getElementById("minGradeInput").value);
    }
    if (parseInt(document.getElementById("maxGradeInput").value)) {
        max = parseInt(document.getElementById("maxGradeInput").value);
    }
    if (student.grade >= min && student.grade <= max) {
        return student;
    }
};

// let filteredByGradeInput = students.filter(filterByGradeRange); // does not work when passed as argument in HTML onclick

let filterByNameInput = (student) => {
    // helper function for filter method
    let nameInput = document.getElementById("nameInput").value.toLowerCase();
    let firstName = student.name.split(" ")[0].toLowerCase();
    let lastName = student.name.split(" ")[1].toLowerCase();
    if (firstName.includes(nameInput) || lastName.includes(nameInput)) {
        return student;
    }
};

//students.filter(filterByNameInput).filter(filterByGradeRange);

let filterByGradeAndNameInput = () => {
    loadTable(students.filter(filterByNameInput).filter(filterByGradeRange));
};

let ascendingFirstName = () => {
    studentsSpread.sort(function (a, b) {
        let firstNameA = a.name.split(" ")[0].toLowerCase();
        let firstNameB = b.name.split(" ")[0].toLowerCase();
        if (firstNameA < firstNameB) return -1;
        if (firstNameA > firstNameB) return 1;
        return 0;
    });
};

let descendingFirstName = () => {
    studentsSpread.sort(function (a, b) {
        let firstNameA = a.name.split(" ")[0].toLowerCase();
        let firstNameB = b.name.split(" ")[0].toLowerCase();
        if (firstNameA < firstNameB) return 1;
        if (firstNameA > firstNameB) return -1;
        return 0;
    });
};

function firstNameClickHandler() {
    switch (firstNameClickCount % 3) {
        case 0:
            ascendingFirstName();
            loadTable(studentsSpread);
            break;
        case 1:
            descendingFirstName();
            loadTable(studentsSpread);
            break;
        case 2:
            loadTable(students);
            break;
    }
    firstNameClickCount++;
}

let ascendingLastName = () => {
    studentsSpread.sort(function (a, b) {
        let lastNameA = a.name.split(" ")[1].toLowerCase();
        let lastNameB = b.name.split(" ")[1].toLowerCase();
        if (lastNameA < lastNameB) return -1;
        if (lastNameA > lastNameB) return 1;
        return 0;
    });
};

let descendingLastName = () => {
    studentsSpread.sort(function (a, b) {
        let lastNameA = a.name.split(" ")[1].toLowerCase();
        let lastNameB = b.name.split(" ")[1].toLowerCase();
        if (lastNameA < lastNameB) return 1;
        if (lastNameA > lastNameB) return -1;
        return 0;
    });
};

function lastNameClickHandler() {
    switch (lastNameClickCount % 3) {
        case 0:
            ascendingLastName();
            loadTable(studentsSpread);
            break;
        case 1:
            descendingLastName();
            loadTable(studentsSpread);
            break;
        case 2:
            loadTable(students);
            break;
    }
    lastNameClickCount++;
}
// use spread operator
let ascendingGradeScore = () => {
    studentsSpread.sort(function (a, b) {
        let gradeA = a.grade;
        let gradeB = b.grade;
        if (gradeA < gradeB) return -1;
        if (gradeA > gradeB) return 1;
        return 0;
    });
};

let descendingGradeScore = () => {
    studentsSpread.sort(function (a, b) {
        let gradeA = a.grade;
        let gradeB = b.grade;
        if (gradeA < gradeB) return 1;
        if (gradeA > gradeB) return -1;
        return 0;
    });
};

function gradeClickHandler() {
    switch (gradeClickCount % 3) {
        case 0:
            ascendingGradeScore();
            loadTable(studentsSpread);
            break;
        case 1:
            descendingGradeScore();
            loadTable(studentsSpread);
            break;
        case 2:
            loadTable(students);
            break;
    }
    gradeClickCount++;
}
