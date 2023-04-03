// =========================
// Variables
// =========================

// $ - element from DOM

const $selectLang = document.querySelector('.select_lang');
const $rolledOpenButtons = document.querySelectorAll('.rolled_btn');
const $rolledBackButtons = document.querySelectorAll('.rolled_back_btn');
const $faqItems = document.querySelectorAll('.faq_section__item');
const $btnTop = document.querySelector('.scroll_top_btn');
const $burgerBtn = document.querySelector('.header__burger');
const $sideMenu = document.querySelector('.header__navigation ul');
const observer = new IntersectionObserver(_bannerVisibleHandler);
const $mainBanner = document.querySelector('.banner_lg');
const $providersBtn = document.querySelector('.providers__compact');
const $bonusBanner = document.querySelector('.bonus_banner_wrap');
const $bonusBannerCloseBtn = document.querySelector('.bonus_banner__close_btn');

let isCompactMenu = false;
let isMoveLangsInSide = false;
let startX;
let startY;
let threshold = 100; // расстояние, необходимое для определения свайпа

// =========================
// Events
// =========================

window.addEventListener("resize", () => {
  checkWindowSizeRelative();
});

document.addEventListener("DOMContentLoaded", checkWindowSizeRelative);

if ($bonusBanner && $bonusBannerCloseBtn) {
  $bonusBannerCloseBtn.addEventListener("click", () => {
    $bonusBanner.setAttribute("hidden", "");
  });
}

if ($providersBtn && window.innerWidth < 990) {
  $providersBtn.addEventListener("click", () => {
    const $providersWrap = $providersBtn.closest(".providers");

    if ($providersWrap) {
      $providersWrap.toggleAttribute("active");
    }
  });
}

if ($burgerBtn) {
  $burgerBtn.addEventListener("click", () => {
    if ($burgerBtn.classList.contains("active")) {
      _closeMenu();
    } else {
      _openMenu()
    }
  });
}

if ($btnTop && window) {
  $btnTop.addEventListener("click", _scrollToTop);
}

if ($selectLang) {
  _addSelectLangHandler($selectLang);
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

if ($mainBanner) {
  observer.observe($mainBanner);
}

// =========================
// Functions
// =========================

function _openMenu() {
  if (!$sideMenu || !$burgerBtn) return;

  $sideMenu.removeAttribute("active");
  $burgerBtn.classList.remove("active");

  if (window.innerWidth <= 420) {
    document.body.style.overflowY = "scroll";
  }
}

function _closeMenu() {
  if (!$sideMenu || !$burgerBtn) return;

  $sideMenu.setAttribute("active", "");
  $burgerBtn.classList.add("active");

  if (window.innerWidth <= 420) {
    document.body.style.overflowY = "hidden";
  }
}

function _addSelectLangHandler(select) {
  select.addEventListener("click", () => {
    select.toggleAttribute("active");
  });
}


function checkWindowSizeRelative() {
  if (window.innerWidth <= 990) {
    if (!isCompactMenu) {
      _setCompactMenu();
    }
  } else {
    if (isCompactMenu) {
      _removeAddItemsMenu();
    }
  }

  if (window.innerWidth <= 510 && !isMoveLangsInSide) {
    _moveToSideLangSelect();
  } else {
    const $oldSelectLangsMob = document.querySelectorAll('.select_lang__mob');

    if (!$oldSelectLangsMob.length || !isMoveLangsInSide) return;

    isMoveLangsInSide = false;
    $oldSelectLangsMob.forEach(select => select.remove());
  }
}


function _moveToSideLangSelect() {
  const $selectLang = document.querySelector('.select_lang');

  if (!$selectLang || !$sideMenu) return;

  const copySelect = $selectLang.cloneNode(true);
  copySelect.classList.add("select_lang__mob");
  $sideMenu.prepend(copySelect);

  _addSelectLangHandler(copySelect);
  isMoveLangsInSide = true;
}


function _removeAddItemsMenu() {
  const $addItemsMenu = document.querySelectorAll('.add_item_menu');

  if (!$addItemsMenu.length) return;

  $addItemsMenu.forEach(item => item.remove());
  isCompactMenu = false;
}


function _setCompactMenu() {
  if (!$sideMenu) return;

  const $categories = document.querySelectorAll('.categories li');
  let catsCopy = [];

  $categories.forEach(cat => {
    let copyNode = cat.cloneNode(true);
    copyNode.querySelector("a").className = "";
    copyNode.className = "add_item_menu";
    catsCopy.push(copyNode);
  });

  for (const cat of catsCopy) {
    $sideMenu.append(cat);
  }

  isCompactMenu = true;
}


function _bannerVisibleHandler(entries) {
  if (entries[0].isIntersecting) {
    $btnTop.removeAttribute("active");
  } else {
    $btnTop.setAttribute("active", "");
  }
}


function _scrollToTop() {
  const currentPosition = document.documentElement.scrollTop || document.body.scrollTop;

  if (currentPosition > 0) {
    window.requestAnimationFrame(_scrollToTop);
    window.scrollTo(0, currentPosition - currentPosition / 15);
  }
}


function _rolledHandler(handlersArr) {
  handlersArr.forEach(btn => {
    btn.addEventListener("click", () => {
      const $curRolled = btn.closest(".rolled");

      if (!$curRolled) return;

      if ($curRolled.hasAttribute("active") && window.innerWidth <= 420) {
        $curRolled.scrollIntoView({ behavior: "smooth", block: "start" });
      }

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

// SWIPE =======================================

document.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

document.addEventListener('touchmove', (e) => {
  let currentX = e.touches[0].clientX;
  let currentY = e.touches[0].clientY;
  let diffX = startX - currentX;
  let diffY = startY - currentY;

  if (Math.abs(diffX) > Math.abs(diffY)) {
    if (diffX > threshold && window.innerWidth <= 1025) { // swipe left
      _openMenu();
    } else if (diffX < -threshold) { // swipe right
      _closeMenu();
    }
  }
});

document.addEventListener('touchend', (e) => {
  startX = null;
  startY = null;
});