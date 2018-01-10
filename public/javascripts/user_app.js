
var createuser = document.getElementById('createUser');

createUser.addEventListener('submit', function(e){

  formData = new FormData(createUser);
  console.log(formData);

  var url = 'http://localhost:3000/api/users/create'

  var xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.send(formData);

  e.preventDefault();
});
