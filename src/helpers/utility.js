/**
 * Sort kittens with name
 * @param rowA
 * @param rowB
 */
export const caseInsensitiveSort = (rowA, rowB) => {
  const a = rowA.name.toLowerCase();
  const b = rowB.name.toLowerCase();

  if (a > b) {
    return 1;
  }

  if (b > a) {
    return -1;
  }

  return 0;
};

/**
 * Returns a random number between a range
 */
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


/**
 * Resolve response and create data for kittens from random user api
 * @param {{name: {first: string, last: string}, login:{uuid: string}, location: {street:{number: number}}}} response
 * @returns {{name: string, age: number, ninjaLevel: number, image: string}}
 */
export const resolveKittenResponse = (response) => ({
  id: response.login.uuid,
  name: response.name.first.toUpperCase(),
  age: getRandomNumber(1, 5),
  image: `http://placekitten.com/g/${getRandomNumber(2, 5)}00/${getRandomNumber(3, 5)}00`,
  ninjaLevel: response.location.street.number
})


