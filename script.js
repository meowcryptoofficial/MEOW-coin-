// ===== FAQ TOGGLE =====
function toggleFaq(button) {
  const item = button.parentElement;
  const isOpen = item.classList.contains('open');

  // Close all others (optional — remove this loop if you want multiple open)
  document.querySelectorAll('.faq-item').forEach(faq => {
    faq.classList.remove('open');
  });

  // Toggle current
  if (!isOpen) {
    item.classList.add('open');
  }
}
