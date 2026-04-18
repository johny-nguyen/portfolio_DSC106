

console.log('IT’S ALIVE!');


function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// navlinks = $$("nav a")

// let currentLink = navLinks.find(
//   (a) => a.host === location.host && a.pathname === location.pathname,
// );

// currentLink?.classList.add('current');

let pages = [
  { url: '', title: 'Home' },
  { url: 'projects/', title: 'Projects' },
  { url: 'contact/', title: 'Contacts' },
  { url: 'https://github.com/johny-nguyen', title: 'Profile'},
  { url: 'cv/', title: 'CV' },
];

let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
  let url = p.url;
  let title = p.title;
  // next step: create link and add it to nav
  const BASE_PATH = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
  ? "/"                  // Local server
  : "/website/";         // GitHub Pages repo name

  url = !url.startsWith('http') ? BASE_PATH + url : url;

  let a = document.createElement('a');
  a.href = url;
  a.textContent = title;
  nav.append(a);

  a.classList.toggle(
    'current',
    a.host === location.host && a.pathname === location.pathname,
  );

  if (a.host !== location.host) {
    a.target = '_blank';
  }

}

document.body.insertAdjacentHTML(
  'afterbegin',
  `
	<label class="color-scheme">
		Theme:
		<select>
			<!-- TODO add <option> elements here -->
      <option value = 'light dark'>light dark </option>
      <option value = 'dark'>dark</option>
      <option value = 'light'>light</option>
		</select>
	</label>`,
);

let select = document.querySelector('select');

select.addEventListener('input', function (event) {
  console.log('color scheme changed to', event.target.value);
  document.documentElement.style.setProperty('color-scheme', event.target.value);
  localStorage.colorScheme = event.target.value;
});

if ("colorScheme" in localStorage){
  let color_scheme = localStorage.colorScheme;
  document.documentElement.style.setProperty('color-scheme', color_scheme);
  select.value = color_scheme;
}

let form = document.querySelector('form');

form?.addEventListener('submit', function (event){
  event.preventDefault();
  let data = new FormData(form);
  for (let [name, value] of data) {
  // TODO build URL parameters here
    console.log(name, encodeURIComponent(value));
  }
  // location.href = url;

});