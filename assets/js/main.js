
(function() {
  "use strict";

  /* selector helper function */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {return [...document.querySelectorAll(el)]} 
    else {return document.querySelector(el)}
  }


  /* event listener function */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }


  /* on scroll event listener */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /* ------------------------------------------------------------------------------ */

  /* Navbar links light up while scroll */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)

      if (!section) return

      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)


  /* Scrolls to an element with header offset */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }


  /* Mobile nav toggle */
  on('click', '.mobile-nav-toggle', function(e) {
      select('body').classList.toggle('mobile-nav-active')
      this.classList.toggle('bi-list')
      this.classList.toggle('bi-x')
  })


  /* Scroll with ofset on links with a class name .scrollto */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
          body.classList.remove('mobile-nav-active')
          let navbarToggle = select('.mobile-nav-toggle')
          navbarToggle.classList.toggle('bi-list')
          navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)


  /* Skills animation */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',

      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }


  /* Animation on scroll */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()