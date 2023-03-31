// =========================
// Variables
// =========================

const $selectLang = document.querySelector('.select_lang');
const $rolledOpenButtons = document.querySelectorAll('.rolled_btn');
const $rolledBackButtons = document.querySelectorAll('.rolled_back_btn');

// =========================
// Events
// =========================

if ($selectLang) {
  $selectLang.addEventListener("click", () => {
    $selectLang.toggleAttribute("active");
  });
}

if ($rolledOpenButtons) {
  _rolledHandler($rolledOpenButtons);
}

if ($rolledBackButtons) {
  _rolledHandler($rolledBackButtons);
}

// =========================
// Functions
// =========================

function _rolledHandler(handlersArr) {
  handlersArr.forEach(btn => {
    btn.addEventListener("click", () => {
      const $curRolled = btn.closest(".rolled");

      if (!$curRolled) return;

      $curRolled.toggleAttribute("active");
    });
  });
}