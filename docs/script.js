(function () {
  var btn = document.getElementById('copy-cmd');
  var pre = document.getElementById('piper-cmd');
  var status = document.getElementById('status');
  if (!btn || !pre || !status || !navigator.clipboard) return;
  btn.hidden = false;
  btn.addEventListener('click', function () {
    navigator.clipboard.writeText(pre.textContent).then(function () {
      status.textContent = '';
      setTimeout(function () { status.textContent = 'Commands copied.'; }, 50);
    }, function () {
      status.textContent = 'Copying did not work here, but you can select the commands and copy them yourself.';
    });
  });
})();
