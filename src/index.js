import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

$(document).ready(() => {
  $('#image').change((event) => {
    previewImage(event);
  });
  $('#submit').click(() => {
    postPhotoData();
  });
});

async function postPhotoData() {
  const photo = document.getElementById('image').files[0];
  const formData = new FormData();

  formData.append('photo', photo);

  try {
    axios.post('/', formData);
  } catch (err) {
    console.log(err);
  }
}

async function testGet() {
  try {
    const response = await axios.get('/');
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

function previewImage(event) {
  const reader = new FileReader();
  reader.onload = () => {
    const output = document.getElementById('output-image');
    output.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}
