/**
 * Fetch kittens from random user api server
 * {@link https://randomuser.me/documentation}
 * @type {Promise<{results: Array<{name: {first: string, last: string}, login:{uuid: string}, location: {street:{number: number}}}>}>}
 */
export const fetchKittens  = fetch('https://randomuser.me/api/?inc=name,location,picture,login&results=100&nat=gb').then(r=>r.json())
