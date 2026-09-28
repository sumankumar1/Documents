(function () {
  function closeAllDialogs() {
    document.querySelectorAll('dialog.detail-dialog[open]').forEach(function (d) {
      d.removeAttribute('open');
    });
  }

  function openDialog(id) {
    var dlg = document.getElementById(id);
    if (dlg && typeof dlg.showModal === 'function') dlg.showModal();
  }

  document.addEventListener('DOMContentLoaded', function () {
    closeAllDialogs();

    document.querySelectorAll('dialog.detail-dialog').forEach(function (d) {
      d.addEventListener('click', function (e) {
        if (e.target === d) d.close();
      });
    });

    document.addEventListener('click', function (e) {
      var opener = e.target.closest('[data-dialog]');
      if (opener) {
        e.preventDefault();
        openDialog(opener.getAttribute('data-dialog'));
        return;
      }
      var closer = e.target.closest('[data-close]');
      if (closer) {
        var dd = closer.closest('dialog');
        if (dd) dd.close();
      }
    });

    if (location.hash.length > 1) {
      var byId = document.getElementById(location.hash.slice(1));
      if (byId && byId.hasAttribute('data-dialog')) {
        openDialog(byId.getAttribute('data-dialog'));
        byId.scrollIntoView({ block: 'center' });
      }
    }
  });
})();
