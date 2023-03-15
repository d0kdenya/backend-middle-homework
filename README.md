1) Запрос(ы) для вставки данных минимум о двух книгах в коллекцию books.

await db.collection(books).insertMany({
   title: 'Война и мир',
   description: "Повествует о войне против Наполеона",
   authors: "Лев Толстой"
}, {
    title: 'Капитанская дочка',
    description: "Повествует о временах восстания Емельяна Пугачёва",
    authors: 'А.С. Пушкин'
})

2) Запрос для поиска полей документов коллекции books по полю title.

await db.collection(books).find({
   title: 'Капитанская дочка'
})

3) Запрос для редактирования полей: description и authors коллекции books по _id записи.
await db.collection(books).findOneAndUpdate(
    { _id: 1 },
    { $set: {
        description: 'Повесть о мёртвых душах',
        authors: 'Н.В. Гоголь'
    } })