// =========================
// Variables
// =========================

const $selectLang = document.querySelector('.select_lang');
const $rolledOpenButtons = document.querySelectorAll('.rolled_btn');
const $rolledBackButtons = document.querySelectorAll('.rolled_back_btn');
const $faqItems = document.querySelectorAll('.faq_section__item');

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

if ($faqItems) {
  $faqItems.forEach(item => {
    item?.addEventListener("click", (e) => _openFaqBlock(e));
  });
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

function _openFaqBlock(e) {
  const $curItem = e.target.closest(".faq_section__item");

  if ($curItem && $curItem.classList.contains("active")) {
    $curItem.classList.remove("active");
    return;
  }
  
  $faqItems.forEach(item => item.classList.remove("active"));
  $curItem.classList.add("active");
}