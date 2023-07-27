export const users = [
  {
    _id: 1,
    name: "edu",
    email: "edu@gmail.com",
    password: "senha123",
    image:
      "https://paisefilhos.uol.com.br/wp-content/uploads/2019/12/fuato_silva_marilia_mendonca.jpg",
    communities: [
      {
        id: 1,
        name: "Leitura HardCore",
      },
      {
        id: 3,
        name: "Cegos Leitores",
      },
    ],
    books: [
      {
        id: 1,
        title: "As Tranças do Rei careca",
        image:
          "https://paisefilhos.uol.com.br/wp-content/uploads/2019/12/fuato_silva_marilia_mendonca.jpg",
        status: "lido",
        totalChapter: 15,
        chaptersRead: 15,
        favorite: true,
        lastSequence: "12/12/2012",
        goalExpire: "01/01/2021",
        goals: [
          {
            type: "days",
            partial: 15,
            total: 15,
          },
        ],
      },
      {
        id: 2,
        title: "Poeira em Alto Mar",
        image:
          "https://paisefilhos.uol.com.br/wp-content/uploads/2019/12/fuato_silva_marilia_mendonca.jpg",
        status: "lendo",
        totalChapter: 12,
        chaptersRead: 9,
        favorite: false,
        lastSequence: "12/12/2022",
        goalExpire: "12/12/2023",
        goals: [
          {
            type: "pages",
            partial: 395,
            total: 445,
          },
        ],
      },
    ],
    statistics: {
      lastSequence: "09/07/2023",
      readingTime: 241,
      maxSequence: 3,
      actualSequence: 1,
      goalsAchieved: 5,
    },
  },
  {
    _id: 2,
    name: "Henrique",
    email: "henrique@gmail.com",
    password: "senha123",
    image:
      "https://paisefilhos.uol.com.br/wp-content/uploads/2019/12/fuato_silva_marilia_mendonca.jpg",
    communities: [
      {
        id: 4,
        name: "Leia ou morra tentando",
      },
      {
        id: 6,
        name: "Os filhos do Paulo Coelho",
      },
    ],
    books: [
      {
        id: 1,
        title: "As Tranças do Rei careca",
        image:
          "https://paisefilhos.uol.com.br/wp-content/uploads/2019/12/fuato_silva_marilia_mendonca.jpg",
        status: "lido",
        totalChapter: 15,
        chaptersRead: 15,
        favorite: true,
        lastSequence: "12/12/2012",
        goalExpire: "01/01/2021",
        goals: [
          {
            type: "days",
            partial: 15,
            total: 15,
          },
        ],
      },
      {
        id: 2,
        title: "Poeira em Alto Mar",
        image:
          "https://paisefilhos.uol.com.br/wp-content/uploads/2019/12/fuato_silva_marilia_mendonca.jpg",
        status: "lendo",
        totalChapter: 12,
        chaptersRead: 9,
        favorite: false,
        lastSequence: "12/12/2022",
        goalExpire: "12/12/2023",
        goals: [
          {
            type: "pages",
            partial: 395,
            total: 445,
          },
        ],
      },
    ],
    statistics: {
      lastSequence: "12/06/2022",
      readingTime: 1021,
      maxSequence: 22,
      actualSequence: 7,
      goalsAchieved: 25,
    },
  },
  {
    _id: 3,
    name: "Anderson",
    email: "Anderson@gmail.com",
    password: "senha123",
    image:
      "https://paisefilhos.uol.com.br/wp-content/uploads/2019/12/fuato_silva_marilia_mendonca.jpg",
    communities: [
      {
        id: 2,
        name: "História é viver",
      },
      {
        id: 3,
        name: "Cegos Leitores",
      },
    ],
    books: [
      {
        id: 1,
        title: "As Tranças do Rei careca",
        image:
          "https://paisefilhos.uol.com.br/wp-content/uploads/2019/12/fuato_silva_marilia_mendonca.jpg",
        status: "lido",
        totalChapter: 15,
        chaptersRead: 15,
        favorite: true,
        lastSequence: "12/12/2012",
        goalExpire: "01/01/2021",
        goals: [
          {
            type: "days",
            partial: 15,
            total: 15,
          },
        ],
      },
      {
        id: 2,
        title: "Poeira em Alto Mar",
        image:
          "https://paisefilhos.uol.com.br/wp-content/uploads/2019/12/fuato_silva_marilia_mendonca.jpg",
        status: "lendo",
        totalChapter: 12,
        chaptersRead: 9,
        favorite: false,
        lastSequence: "12/12/2022",
        goalExpire: "12/12/2023",
        goals: [
          {
            type: "pages",
            partial: 395,
            total: 445,
          },
        ],
      },
    ],
    statistics: {
      lastSequence: "13/06/2023",
      readingTime: 563,
      maxSequence: 31,
      actualSequence: 21,
      goalsAchieved: 31,
    },
  },
];

export function insertUser(user) {
  let index = users.length + 1;
  const newUser = {
    _id: index,
    name: user.name,
    email: user.email,
    password: user.password,
    image: "",
    communities: [],
    books: [],
    statistics: {
      lastSequence: new Date(),
      readingTime: 0,
      maxSequence: 0,
      actualSequence: 0,
      goalsAchieved: 0,
    },
  };
  users.push(newUser);
  return newUser;
}

export function insertBook(userId, book) {
  let bookIndex = users[userId].books.length + 1;
  const newBook = {
    id: bookIndex,
    title: book.title,
    image: "",
    status: "ler",
    totalChapter: book.totalChapter,
    chaptersRead: 0,
    favorite: false,
    lastSequence: new Date(),
    goalExpire: new Date(),
    goals: [
      {
        type: "pages",
        partial: 0,
        total: 0,
      },
    ],
  };
  const insertedBook = users[userId].books.push(newBook);
  console.log(users[userId]);
  return insertedBook;
}

export function deleteBookById(userId, bookId) {
  const newBookList = users[userId].books.filter((book) => book !== bookId);
  return newBookList;
}
