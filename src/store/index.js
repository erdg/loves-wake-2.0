import createStore from 'unistore';
import API_ENDPOINT from '../api';

let store = createStore({ user: {} });

let actions = store => ({

   async getUserDate(state) {
      let res = await fetch(API_ENDPOINT + "!getUserData")
      return { user: await res.json() }
   }

})

export { store, actions };
