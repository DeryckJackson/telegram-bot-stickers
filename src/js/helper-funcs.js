function showSpinner() {
  const button = $('#createPackButton')
  const spinner = $('.spinner-border')

  button.addClass('disabled')
  spinner.show()
}

function hideSpinner() {
  const button = $('#createPackButton')
  const spinner = $('.spinner-border')

  button.removeClass('disabled')
  spinner.hide()
}

// Adds a preview for the selected image
function previewImage(event) {
  const reader = new FileReader()
  reader.onload = () => {
    const output = document.getElementById('output-image')
    output.src = reader.result
  };
  reader.readAsDataURL(event.target.files[0])
}

export { showSpinner, hideSpinner, previewImage }
