import { getRules, setRules } from "./lib/storage"
import { isOnProduction } from "./lib/is-on-production"
function show_warning() {

    const newElement = document.createElement('div')


    newElement.innerHTML = `
    <div id="you-are-on-production">
        <div id="you-are-on-production__banner" data-pin="top">
        <span id="you-are-on-production__text">
        <img height="24" src="https://media.tenor.com/WHcbLJOEr2AAAAAi/triangle.gif" />
        YOU ARE ON PRODUCTION
        <img height="24" src="https://media.tenor.com/WHcbLJOEr2AAAAAi/triangle.gif" />
        </span>
        <button id="you-are-on-production__button">Pin to bottom</button>
        </div>
    </div>
    `

    const style = document.createElement('style');
    style.innerHTML = `
    body {

    }
  #you-are-on-production {
    --border: #f97316;
    --stripe-1: #f97316;
    --stripe-2: #fb923c;
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 999999999;
    border: solid 4px var(--border);
    pointer-events: none;
}
#you-are-on-production__banner {
    pointer-events: all;
    position: absolute;
    left: 0px;
    right: 0px;
    z-index: 999999999;
    background: repeating-linear-gradient(  45deg,  var(--stripe-1),  var(--stripe-1) 10px,  var(--stripe-2) 10px,  var(--stripe-2) 20px);
    padding: 16px 32px;
    color: white;
    font-weight: 600;
    text-shadow: 1px 1px 4px #0009;
    font-size: 20px;
    padding: 16px;
    font-family: system-ui;
    border-bottom: solid 4px #f97316;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
#you-are-on-production__banner[data-pin="top"] {
    top: 0px;
}
#you-are-on-production__banner[data-pin="bottom"] {
    bottom: 0px;
}
#you-are-on-production__text {
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
  #you-are-on-production__button {
    all:initial;
    background: white;
    color: var(--stripe-1);
    font-family: system-ui;
    padding: 4px 12px;
    border-radius: 4px;
    border: solid 1px rgb(0 0 0 / 12%);
    cursor: pointer;
  }
  #you-are-on-production__button:hover {
    background: #eeeeee;
  }
  `

    document.body.appendChild(newElement);
    document.body.appendChild(style);

    const banner = document.getElementById('you-are-on-production__banner');
    const button = document.getElementById('you-are-on-production__button');
    if (banner && button) {
        button.addEventListener('click', e => {
            if (banner.dataset.pin === 'top') {
                banner.dataset.pin = 'bottom';
                button.innerText = 'Pin to top';
            } else {
                banner.dataset.pin = 'top';
                button.innerText = 'Pin to bottom';

            }
        })
    }
}

async function checkIsOnProduction() {
    const url = new URL(window.location.toString())
    const rules = await getRules()
    const is_on_production = isOnProduction(url, rules);
    if (is_on_production) {
        show_warning()
    }

}
checkIsOnProduction();