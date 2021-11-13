import {resolveKittenResponse} from "./utility";

/**
 * Fetch kittens - if local json is empty trigger online kittens, save then load from local onwards
 * {@link https://randomuser.me/documentation}
 */
export const fetchKittens = async () => {
  const localKittens = await fetch('/server/kittens.json').then(r => r.json())
  if(!localKittens.kittens.data.length) {
    const onlineKittens = await fetch('https://randomuser.me/api/?inc=name,location,picture,login&results=100&nat=gb').then(r => r.json())
    return new Promise((resolve, reject) => {
      fetch('http://localhost:8080/kittens', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({data: onlineKittens.results})
      }).then(r => r.json()).then(resolve).catch(()=>{
        resolve({data: onlineKittens.results})
      })
    })
  }
  return localKittens.kittens
}
