class StudentLog {
  constructor() {
    // DH: If the student wants to logout, make sure that the edit-dialog closes
    $('#header-nav').on('click', () => {
      if ($('#edit-dialog').is(':visible')) {
        // If browser closed or reload, make sure to release the lock!
        window.hideForm()
      }
    })

    // DH: filter the student logs
    // DH: Check if a change happened
    $('#students').on('click', function () {
      // Go through all the students
      $('.filter_students:checkbox').each(function () {
        if ($(this).is(':checked')) {
          // Show all checked
          $('*[data-student="' + this.id + '"]').show()
        } else {
          // Hide all unchecked
          $('*[data-student="' + this.id + '"]').hide()
        }
      })
    })
    // DH: Check all filters
    $('#checkAll').on('click', function () {
      $('.filter_students').prop('checked', true)
      $('#students').click()
    })
    // DH: Uncheck all filters
    $('#uncheckAll').on('click', function () {
      $('.filter_students').prop('checked', false)
      $('#students').click()
    })
    // DH: filter students, who left the map
    $('#label_filter_left_students').on('click', function () {
      $('#students').click()
    })
  }
}

export default StudentLog
