function createNavLink(href, text) {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = text;
    return link;
 }

function createHeader() {
    const header = document.createElement('header');
    
    const label = document.createElement('label');
    label.style.marginRight = '1rem'; // adjust spacing before menu

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.autocomplete = 'off';

    label.append(checkbox, ' Dark mode');
    
    checkbox.addEventListener('change', () => {
    const isDarkMode = checkbox.checked;
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('darkMode', isDarkMode);
  });

  // Restore state
  const darkModePref = localStorage.getItem('darkMode');
  if (darkModePref === 'true') {
    checkbox.checked = true;
    document.body.classList.add('dark-mode');
  }

    
    // h1
    const h1 = document.createElement('h1');

    const pathName = window.location.pathname;

    switch(pathName){
        case '/index.html':
        case '/':
            h1.textContent ='JB Diei';
            break;
        case '/hobbies.html':
            h1.textContent = 'Hobbies';
            break;
        default:
            h1.textContent = 'JB Diei'; 
            break;
  }
     

    // nav
    const nav = document.createElement('nav');
    nav.classList.add('hidden')
    const links = [
    { href: 'index.html', text: 'Home' },
    { href: 'hobbies.html', text: 'Hobbies' },
    ];

    for (const { href, text } of links) {
    nav.append(createNavLink(href, text));
    }

    const menuButton = document.createElement('button');
    menuButton.id = 'menu-button';
    menuButton.textContent = 'Menu';

    menuButton.addEventListener('click', () => {
    nav.classList.toggle('hidden');
    });

    document.body.addEventListener('click', (event) => {
    const clickedInsideHeader = header.contains(event.target);
    if (!clickedInsideHeader) {
        nav.classList.add('hidden');
    }
    });

    const rightControls = document.createElement('div');
    rightControls.classList.add('right-controls');
    rightControls.append(label, menuButton);

  // Assemble header
  header.append(h1, nav, rightControls);
  return header;
}

// Insert into DOM
const main = document.querySelector('main');
const header = createHeader();
main.prepend(header);