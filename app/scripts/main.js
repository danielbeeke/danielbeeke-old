(function() {
  $('.skillbars-wrapper').skillBars({
    skills: {
      drupal: {
          from: 2007,
          percentage: 90,
          label: 'Drupal'
      },
      jquery: {
          from: 2009,
          percentage: 80,
          label: 'jQuery'
      },
      sass: {
          from: 2011,
          percentage: 90,
          label: 'Sass'
      },
      yeoman: {
          from: 2012,
          percentage: 75,
          label: 'Yeoman and standalone grunt'
      },
      nodejs: {
        from: 2012,
        percentage: 50,
        label: 'Node JS'
      },
      meteorjs: {
        from: 2013,
        percentage: 60,
        label: 'Meteor JS'
      },
      emberjs: {
        from: 2013,
        percentage: 30,
        label: 'Ember JS'
      },
      angularjs: {
        from: 2012,
        till: 2013,
        percentage: 20,
        label: 'Angular JS'
      },
      inkscape: {
        from: 2006,
        percentage: 90,
        label: 'Inkscape'
      },
      sql: {
        from: 2010,
        percentage: 75,
        label: 'MySQL, MariaDB'
      },
      // vb: {
      //   from: 2003,
      //   till: 2007,
      //   percentage: 40,
      //   label: 'Visual Basic 6'
      // },
      // coreldraw: {
      //   from: 2002,
      //   till: 2006,
      //   percentage: 60,
      //   label: 'CorelDRAW'
      // },
      git: {
        from: 2010,
        percentage: 70,
        label: 'GIT'
      },
      postgresql: {
        from: 2012,
        percentage: 40,
        label: 'PostgreSQL/PostGIS'
      },
      qgis: {
        from: 2012,
        percentage: 40,
        label: 'Qgis'
      },
      leaflet: {
        from: 2011,
        percentage: 80,
        label: 'Leaflet'
      },
      tilemill: {
        from: 2011,
        percentage: 65,
        label: 'Tilemill'
      },
      fedora: {
        from: 2004,
        till: 2005,
        percentage: 50,
        label: 'Fedora Core'
      },
      ubuntu: {
        from: 2005,
        percentage: 80,
        label: 'Ubuntu'
      },
      centos: {
        from: 2010,
        till: 2012,
        percentage: 65,
        label: 'CentOS'
      },
      debian: {
        from: 2012,
        percentage: 70,
        label: 'Debian'
      },
      php4: {
        from: 2010,
        percentage: 80,
        label: 'PHP 4'
      },
      php5: {
        from: 2013,
        percentage: 40,
        label: 'PHP 5'
      }
    }
  })

  $.each($('.skill-wrapper'), function (delta, wrapper) {
    if ($('.text-' + $(wrapper).data('id')).length) {
      $('.text-' + $(wrapper).data('id')).appendTo(wrapper)
    }
    else {
      $('<div class="skill-text"><h2>' + $('> .label', wrapper).text() + '</h2><p>Geen informatie beschikbaar.</p></div>').appendTo(wrapper)
    }
  })

  $('.skillbars-type').click(function () {
    $('.skillbars-wrapper').skillBars($(this).data('type'))

    $('.skillbars-type.active').removeClass('active')
    $(this).addClass('active')

    return false
  })

  $('.skill--label').click(function () {
    $(this).next('.skill-wrapper').click()
  })

  $('.skill-wrapper').click(function () {
    $(this).toggleClass('active')

    if ($('.skill-wrapper.active').length) {
      $('.skillbars-wrapper').addClass('has-active')
    }
    else {
      $('.skillbars-wrapper').removeClass('has-active')
    }
  })

  $('body').on('click', function (e) {
    if ($(e.target).hasClass('skills')) {
      $('.skill-wrapper.active h2').click()
    }
  })

  $('body').removeClass('first-transition-frame')

  $('.avatar').click(function () {
    $('.avatar').toggleClass('is-expanded')
  })

  var timeout

  $(window).on('resize', function () {
    clearTimeout(timeout)

    timeout = setTimeout(function () {
      $('.skillbars-wrapper').skillBars($('.skillbars-type.active').data('type'))
    }, 100)
  })

  var mandrillKey = 'n7FhK7Fj5IBbME_eZiA_BQ'

  $('.send-mail').click(function () {
    $('.real-submit').click()
    $('form').addClass('submitted-once')
    return false
  })

  $('.real-submit').on('click', function (e) {

    if ($('#contact--name:valid').length + $('#contact--mail:valid').length + $('#contact--message:valid').length == 3) {

      $('.send-mail').addClass('sending')

      e.preventDefault()

      $.ajax({
        type: 'POST',
        url: 'https://mandrillapp.com/api/1.0/messages/send.json',
        data: {
          key: mandrillKey,
          message: {
            from_email: $('#contact--mail').val(),
            to: [
                {
                  email: 'daniel.beeke@gmail.com',
                  name: 'Daniel Beeke',
                  type: 'to'
                }
              ],
            autotext: true,
            subject: 'Bericht van danielbeeke.nl van ' + $('#contact--name').val(),
            html: $('#contact--message').val()
          }
        }
      }).done(function(response) {
        if (response[0].status == 'sent') {
          $('.send-mail').removeClass('sending')
          $('.send-mail').addClass('sent')

          setTimeout(function() {
            $('.send-mail').removeClass('sent')
            $('#contact--name').val('')
            $('#contact--mail').val('')
            $('#contact--message').val('')
            $('.submitted-once').removeClass('submitted-once')
          }, 3000)

        }
      })

    }

    return false
  })
})
(function(){
    function addFont() {
        var style = document.createElement('style');
        style.rel = 'stylesheet';
        document.head.appendChild(style);
        style.textContent = localStorage.myFonts;
    }

    try {
        if (localStorage.myFonts) {
            // The font is in localStorage, we can load it directly
            addFont();
        } else {
            // We have to first load the font file asynchronously
            var request = new XMLHttpRequest();
            request.open('GET', '/styles/fonts/fonts.css', true);

            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    // We save the file in localStorage
                    localStorage.myFonts = request.responseText;

                    // ... and load the font
                    addFont();
                }
            }

            request.send();
        }
    } catch(ex) {
        // maybe load the font synchronously for woff-capable browsers
        // to avoid blinking on every request when localStorage is not available
    }
}());
