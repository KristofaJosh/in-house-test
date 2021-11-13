const randomUserUrl = 'https://randomuser.me/api/?inc=name,location,picture,login&results=100&nat=gb'

/**
 * Fetch kittens - if local json is empty trigger online kittens, save then load from local onwards
 * {@link https://randomuser.me/documentation}
 */
export const fetchKittens = (onSuccess, onError) => {
  // first fetch locally
  fetch('/server/kittens.json')
    .then(r => r.json()).then(({kittens}) => {
      if (kittens.data.length < 1) {
        // get online kitten
        fetch(randomUserUrl)
          .then(r => r.json())
          .then(({results}) => {
            // then save if json server is on
            fetch('http://localhost:8080/kittens', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({data: results})
            }).then(()=>onSuccess({data: results}))
              .catch(() => Promise.resolve(onSuccess({data: results})))
          }).catch(onError)
      } else {
        onSuccess(kittens)
      }
    })
    .catch(onError)
}
