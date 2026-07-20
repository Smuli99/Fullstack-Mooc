const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url =
`mongodb+srv://hytosama:${password}@cluster0.20yhkfq.mongodb.net/phonebookApp?appName=Cluster0`;

mongoose.set('strictQuery', false);
mongoose.connect(url, { family: 4 })
  .then(() => console.log('Connected to database!'));

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  console.log('phonebook:');

  Person.find({})
    .then(persons => {
      persons.forEach(person => {
        console.log(`${person.name} ${person.number}`);
      });
    
    mongoose.connection.close();
  })
  .catch(error => {
    console.log(`Database empty: ${error}`);
    mongoose.connection.close();
  });
} else {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4] || "",
  });
  
  person.save().then(result => {
    console.log(
      `added ${person.name}${person.number.trim() === '' ? '' : ` ${person.number}`} to phonebook`
    );
    mongoose.connection.close();
  });
}