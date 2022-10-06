var { faker } = require('@faker-js/faker');
var Person = require('./Person');
var Ancestry = require('./Ancestry');

/** generates a dummy data ancestry dataset containing a specified amount of
 * people. */
function ancestryGenerator(peopleCount = 10) {
  let _ancestry = new Ancestry();

  // define amount of data to generate
  const dataCount = peopleCount;

  // array containing two functions to make either a new child or parent of the
  // reference person passed to them
  const newParentOrChild = [
    // make a new person and set them as the parent of the reference person
    function (refPerson) {
      const parent = new Person();

      const refBirthYear = refPerson.DOB.getFullYear();

      // born 20 - 40 years before the reference person (now child of refPerson)
      parent.DOB = faker.date.birthdate({ min: refBirthYear - 40, max: refBirthYear - 20, mode: 'year' });
      // set relationships
      parent.children.push(refPerson.fullName());
      refPerson.parents.push(parent.fullName());
      _ancestry.data.set(refPerson.fullName(), refPerson);

      return parent;
    },

    // make a new person and set them as the child of the reference person
    function (refPerson) {
      const child = new Person();

      const refBirthYear = refPerson.DOB.getFullYear();

      // born 20 - 40 years after the reference person (now parent of refPerson)
      child.DOB = faker.date.birthdate({ min: refBirthYear + 20, max: refBirthYear + 40, mode: 'year' });
      //set relationships
      child.parents.push(refPerson.fullName());
      refPerson.children.push(child.fullName());
      _ancestry.data.set(refPerson.fullName(), refPerson);

      return child;
    }
  ];

  // returns a random person from the ancestry dataset to be used as a reference
  // for a new person
  const getRandomPerson = () => {
    const index = Math.floor(Math.random() * _ancestry.data.size);

    let counter = 0;
    for (let key of _ancestry.data.keys()) {
      if (counter++ === index) {
        const refPerson = _ancestry.data.get(key);
        if (refPerson.parents >= 2 || refPerson.children > 3) {
          return getRandomPerson();
        } else {
          return refPerson;
        };
      }
    }
  }

  // controls the creation of a new person in the ancestry dataset.
  // Makes either a parent or child of a reference person.
  const makePerson = () => {
    const refPerson = getRandomPerson();

    return newParentOrChild[ Math.floor(Math.random() * newParentOrChild.length) ](refPerson);
  }

  // create an amount of people in the ancestry dataset as specified by "dataCount"
  const generateData = () => {
    const newPerson = makePerson();
    const newName = `${newPerson.fullName()}`;

    // add the new person to the ancestry dataset with their full name
    _ancestry.data.set(newName, newPerson);

    // re-call generator if data count hasn't been reached
    if (_ancestry.data.size < dataCount) {
      generateData();
    }

  }
  generateData();
  // console.log(_ancestry.data);


  return _ancestry;
}

module.exports = ancestryGenerator;
