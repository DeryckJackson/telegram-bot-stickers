import $ from 'jquery'

function showSpinner(buttonId) {
  const button = $(buttonId)
  const spinner = $('.spinner-border')

  button.addClass('disabled')
  spinner.show()
}

function hideSpinner(buttonId) {
  const button = $(buttonId)
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
