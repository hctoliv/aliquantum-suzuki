/* ==========================================================================
   Aliquantum Suzuki — comportamento
   Sem dependências. Tudo degrada com elegância se o JS falhar.
   ========================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* --- Ano no rodapé ---------------------------------------------------- */
  var year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  /* --- Header: estado compacto ao rolar --------------------------------- */
  var hdr = $('#hdr');
  var lastY = -1;
  function onScroll() {
    var y = window.scrollY;
    if (y === lastY) return;
    lastY = y;
    if (hdr) hdr.classList.toggle('is-stuck', y > 24);
  }
  window.addEventListener('scroll', function () {
    window.requestAnimationFrame(onScroll);
  }, { passive: true });
  onScroll();

  /* --- Menu mobile ------------------------------------------------------ */
  var burger = $('#burger');
  var drawer = $('#drawer');

  function setDrawer(open) {
    if (!burger || !drawer) return;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.body.classList.toggle('is-locked', open);
    if (open) {
      drawer.hidden = false;
      // força reflow para a transição pegar
      void drawer.offsetWidth;
      drawer.classList.add('is-open');
    } else {
      drawer.classList.remove('is-open');
      window.setTimeout(function () {
        if (burger.getAttribute('aria-expanded') === 'false') drawer.hidden = true;
      }, reduced ? 0 : 400);
    }
  }

  if (burger) {
    burger.addEventListener('click', function () {
      setDrawer(burger.getAttribute('aria-expanded') !== 'true');
    });
  }
  if (drawer) {
    $$('a', drawer).forEach(function (a) {
      a.addEventListener('click', function () { setDrawer(false); });
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && burger && burger.getAttribute('aria-expanded') === 'true') {
      setDrawer(false);
      burger.focus();
    }
  });

  /* --- Reveal ao entrar na viewport ------------------------------------- */
  var revealables = $$('[data-reveal]');
  if (reduced || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    revealables.forEach(function (el) { io.observe(el); });
  }

  /* --- Botão flutuante do WhatsApp -------------------------------------- */
  var wa = $('#waFloat');
  if (wa) {
    window.setTimeout(function () { wa.classList.add('is-in'); }, reduced ? 0 : 900);
  }

  /* --- Hero: foto de fundo acompanha o modelo em destaque ---------------
     Cada foto foi conferida pelo decalque da carenagem antes de ser pareada:
     so entram modelos cuja identificacao e inequivoca. Specs e precos sao os
     mesmos dos cards da secao "Linha 2026" — se um mudar, mude os dois.

     Uma camada <img> fixa por modelo, trocando so a opacidade. Reaproveitar
     duas camadas e trocar o src forcava um decode novo a cada clique, e a
     transicao so comecava ~1,3s depois.                                      */
  var HERO = [
    { name: 'Hayabusa',       tag: 'Super Sport',   cc: '1.340 cm³', hp: '190 cv', price: 'R$ 124.500',
      foco: '100% 50%', focoMob: '88% 50%' },
    { name: 'V-Strom 1050DE', tag: 'Big Trail',     cc: '1.037 cm³', hp: '107 cv', price: 'R$ 81.650',
      foco: '0% 50%',   focoMob: '56% 50%' },
    { name: 'GSX-S1000GT',    tag: 'Sport Touring', cc: '999 cm³',   hp: '152 cv', price: 'R$ 87.600',
      foco: '82% 50%',  focoMob: '86% 50%' }
  ];

  var camadas = $$('.hero__media');
  var dots = $$('.hero__dots button');
  var heroTimer = null;
  var heroIdx = 0;

  var telaEstreita = window.matchMedia('(max-width: 860px)');
  function focoDe(m) { return telaEstreita.matches ? m.focoMob : m.foco; }

  function paintHero(i) {
    var m = HERO[i];
    if (!m) return;
    heroIdx = i;

    ['name', 'tag', 'cc', 'hp', 'price'].forEach(function (k) {
      var el = $('[data-hc="' + k + '"]');
      if (el) el.textContent = m[k];
    });

    camadas.forEach(function (c, n) {
      if (n === i) {
        c.style.setProperty('--foco', focoDe(m));
        c.classList.add('is-ativa');
      } else {
        c.classList.remove('is-ativa');
      }
    });

    dots.forEach(function (d, n) { d.setAttribute('aria-current', String(n === i)); });
  }

  var onResize = function () {
    var c = camadas[heroIdx];
    if (c) c.style.setProperty('--foco', focoDe(HERO[heroIdx]));
  };
  if (telaEstreita.addEventListener) telaEstreita.addEventListener('change', onResize);
  else if (telaEstreita.addListener) telaEstreita.addListener(onResize);
  onResize();

  function cycleHero() {
    paintHero((heroIdx + 1) % HERO.length);
  }

  if (dots.length && camadas.length) {
    dots.forEach(function (d, i) {
      d.addEventListener('click', function () {
        paintHero(i);
        if (heroTimer) { window.clearInterval(heroTimer); heroTimer = null; }
      });
    });
    if (!reduced) heroTimer = window.setInterval(cycleHero, 7000);
  }

  /* --- Filtro de modelos ------------------------------------------------ */
  var filterBtns = $$('.filters button');
  var models = $$('#models .model');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.getAttribute('data-filter');
      filterBtns.forEach(function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });
      models.forEach(function (m) {
        var cats = (m.getAttribute('data-cat') || '').split(/\s+/);
        var show = f === 'all' || cats.indexOf(f) !== -1;
        m.hidden = !show;
      });
    });
  });

  /* --- Contadores -------------------------------------------------------- */
  var counters = $$('[data-count]');
  function runCounter(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var dec = parseInt(el.getAttribute('data-dec') || '0', 10);
    var suffix = el.getAttribute('data-suffix') || '';
    if (isNaN(target)) return;

    var fmt = function (v) {
      return v.toLocaleString('pt-BR', {
        minimumFractionDigits: dec,
        maximumFractionDigits: dec
      }) + suffix;
    };

    if (reduced) { el.textContent = fmt(target); return; }

    var dur = 1200;
    var t0 = null;
    function step(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased);
      if (p < 1) window.requestAnimationFrame(step);
      else el.textContent = fmt(target);
    }
    window.requestAnimationFrame(step);
  }

  if (counters.length) {
    if (!('IntersectionObserver' in window)) {
      counters.forEach(runCounter);
    } else {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          runCounter(entry.target);
          cio.unobserve(entry.target);
        });
      }, { threshold: 0.6 });
      counters.forEach(function (el) { cio.observe(el); });
    }
  }

  /* --- Atalho: card do modelo pré-seleciona o formulário ----------------- */
  var selModelo = $('#f-modelo');
  $$('[data-model]').forEach(function (el) {
    el.addEventListener('click', function () {
      var name = el.getAttribute('data-model');
      if (!selModelo) return;
      var found = Array.prototype.some.call(selModelo.options, function (opt) {
        if (opt.value === name || opt.textContent.trim() === name) {
          selModelo.value = opt.value;
          return true;
        }
        return false;
      });
      if (found) {
        var nome = $('#f-nome');
        if (nome && !reduced) window.setTimeout(function () { nome.focus({ preventScroll: true }); }, 700);
      }
    });
  });

  /* --- Funil: o formulário abre o WhatsApp com a mensagem pronta --------- */
  var WA_NUMBER = '5511992698532';
  var form = $('#funnel');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var nomeEl = $('#f-nome');
      var nome = (nomeEl && nomeEl.value || '').trim();

      if (!nome) {
        if (nomeEl) {
          nomeEl.setAttribute('aria-invalid', 'true');
          nomeEl.focus();
        }
        return;
      }
      if (nomeEl) nomeEl.removeAttribute('aria-invalid');

      var val = function (id) {
        var el = $(id);
        return el ? el.value.trim() : '';
      };

      var modelo = val('#f-modelo');
      var assunto = val('#f-assunto');
      var periodo = val('#f-periodo');
      var obs = val('#f-obs');

      var linhas = [
        'Olá! Sou ' + nome + ' e vim pelo site da Aliquantum Suzuki.',
        '',
        '• O que eu quero: ' + assunto,
        '• Modelo: ' + modelo,
        '• Melhor período: ' + periodo
      ];
      if (obs) linhas.push('• Observação: ' + obs);
      linhas.push('', 'Consegue confirmar a disponibilidade?');

      var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(linhas.join('\n'));
      window.open(url, '_blank', 'noopener');
    });
  }
})();
