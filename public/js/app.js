var axios = require('axios');
var Vue = require('vue/dist/vue');

var app = new Vue({
  el: '#my-app',
  data: {
    message: 'title from Vue',
    generics: [],
    result: undefined
  },
  methods: {
    getOne: function(event){
      axios.get('/generics/' + event.target.id)
      .then(function (response) {
        app.result = response.data;
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    createOne: function(event){
      axios.post('/generics/' + event.target.id)
      .then(function (response) {
        app.result = response.data;
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    updateOne: function(event){
      axios.post('/generics/' + event.target.id)
      .then(function (response) {
        app.result = response.data;
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    deleteOne: function(event){
      axios.delete('/generics/' + event.target.id)
      .then(function (response) {
        app.message = event.target.id + 'deleted.';
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    getAll: function(event){
      axios.get('/generics')
      .then(function (response) {
         app.generics = response.data;
      })
      .catch(function (error) {
        console.log(error);
      })
    }
  },
});
