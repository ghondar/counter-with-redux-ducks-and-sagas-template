import counterDuck from 'reducers/counter'
 
export default async function(res, req, next) {
     // Get store from locals
     const { store } = res.locals
     // Dispatch a action to change initial state
     await store.dispatch(counterDuck.creators.addCountFromServer())
     // Resave new store
     res.locals.store = store
     // Pass middlerware
     next()
}