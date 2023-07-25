const tabContent = document.querySelectorAll('.tab_content_block');
const tabsParent = document.querySelector('.tab_content_items');
const tabs = document.querySelectorAll('.tab_content_item');

let currentTabIndex = 0;
let intervalId;

const hideTabContent = () => {
  tabContent.forEach((element) => {
    element.style.display = 'none';
  });
  tabs.forEach((element) => {
    element.classList.remove('tab_content_item_active');
  });
};

const showTabContent = (index) => {
  tabContent[index].style.display = 'block';
  tabs[index].classList.add('tab_content_item_active');
};

const switchTab = (index) => {
  hideTabContent();
  currentTabIndex = index;
  showTabContent(currentTabIndex);
};

const autoSwitchTab = () => {
  const nextTabIndex = (currentTabIndex + 1) % tabs.length;
  switchTab(nextTabIndex);
};

const startAutoSwitch = () => {
  clearInterval(intervalId);
  intervalId = setInterval(autoSwitchTab, 3000);
};

const stopAutoSwitch = () => {
  clearInterval(intervalId);
};

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    switchTab(index);
    intervalId = setInterval(autoSwitchTab, 3000);
  });
});

hideTabContent();
showTabContent(currentTabIndex);
startAutoSwitch();

const tabSlider = document.querySelector('.tab_slider');
tabSlider.addEventListener('mouseenter', stopAutoSwitch);
tabSlider.addEventListener('mouseleave', startAutoSwitch);
window.addEventListener('blur', stopAutoSwitch);
window.addEventListener('focus', startAutoSwitch);
