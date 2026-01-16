<script>
document.getElementById('visit-form').addEventListener('submit', (e) => {
  const btn = e.submitter;
  if (btn.dataset.visitType) {
    // Create hidden inputs for visit type buttons
    const actionInput = document.createElement('input');
    actionInput.type = 'hidden';
    actionInput.name = '_action';
    actionInput.value = 'NEXT';
    
    const visitInput = document.createElement('input');
    visitInput.type = 'hidden';
    visitInput.name = 'visitType';
    visitInput.value = btn.dataset.visitType;
    
    e.target.append(actionInput, visitInput);
  }
});
</script>