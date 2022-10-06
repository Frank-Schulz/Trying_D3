// const Ancestry = require('./Ancestry');
const ancestryGenerator = require('./ancestryGenerator');

const getPeopleData = () => {
  const _ancestry = ancestryGenerator(500);

  let peopleData = [];

  for (const v of _ancestry.data.values()) {
    peopleData.push(v);
  }

  console.log("Saving ancestry...");

  return peopleData;
}

module.exports = getPeopleData;
