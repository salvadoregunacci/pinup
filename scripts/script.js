// =========================
// Variables
// =========================

const $selectLang = document.querySelector('.select_lang');

// =========================
// Events
// =========================

if ($selectLang) {
  $selectLang.addEventListener("click", () => {
    $selectLang.toggleAttribute("active");
  });
}

// =========================
// Functions
// =========================