$(document).ready(function() {

    $.validator.addMethod('maskPhone',
        function(value, element) {
            if (value == '') {
                return true;
            }
            return /^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/.test(value);
        },
        'Не соответствует формату'
    );

    $('form').each(function() {
        initForm($(this));
    });

    $('.slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        dots: true,
        responsive: [
            {
                breakpoint: 1169,
                settings: {
                    arrows: false
                }
            }
        ]
    });

    $('.gallery').each(function() {
        var curGallery = $(this);
        var countGallery = curGallery.find('.gallery-item').length;
        if (countGallery > 1) {
            curGallery.find('.gallery-info-pager-count').html(countGallery);
        } else {
            curGallery.find('.gallery-info-pager').hide();
        }
    });

    $('.gallery-list').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: false,
        dots: true
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide){
        var curGallery = $(this).parents().filter('.gallery');
        curGallery.find('.gallery-info-pager-current').html(nextSlide + 1);
    });

    $('.gallery-info-pager-prev').click(function(e) {
        var curGallery = $(this).parents().filter('.gallery');
        curGallery.find('.gallery-list').slick('slickPrev');
        e.preventDefault();
    });

    $('.gallery-info-pager-next').click(function(e) {
        var curGallery = $(this).parents().filter('.gallery');
        curGallery.find('.gallery-list').slick('slickNext');
        e.preventDefault();
    });

    $('.main-gallery-item a').fancybox({
        buttons : [
            'close'
        ],
        lang : 'ru',
        i18n : {
            'ru' : {
                CLOSE   : 'Закрыть',
                NEXT    : 'Вперед',
                PREV    : 'Назад'
            }
        },
        baseTpl:
            '<div class="fancybox-container" role="dialog" tabindex="-1">' +
                '<div class="fancybox-bg"></div>' +
                '<div class="fancybox-toolbar">{{buttons}}</div>' +
                '<div class="fancybox-navigation">{{arrows}}</div>' +
                '<div class="fancybox-inner">' +
                    '<div class="fancybox-stage"></div>' +
                "</div>" +
            "</div>",
        btnTpl: {
            close:
                '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg width="23px" height="23px" viewBox="0 0 23 23" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Pages" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="02_info_gallery_01" transform="translate(-427.000000, -210.000000)" fill="#FFFFFF" fill-rule="nonzero"><g id="multiply-(2)" transform="translate(427.000000, 210.000000)"><polygon id="Shape" points="23 1.04532013 21.9546799 0 11.5 10.4546799 1.04532013 0 0 1.04532013 10.4546799 11.5 0 21.9546799 1.04532013 23 11.5 12.5453201 21.9546799 23 23 21.9546799 12.5453201 11.5"></polygon></g></g></g></svg></button>',
            arrowLeft:
                '<a data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}" href="javascript:;"><svg width="71px" height="72px" viewBox="0 0 71 72" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Group"><g><rect id="Rectangle-4" stroke="#FFFFFF" transform="translate(35.390873, 36.000000) rotate(-45.000000) translate(-35.390873, -36.000000) " x="10.890873" y="11.5" width="49" height="49"></rect><g id="right-arrow-copy-2" transform="translate(34.890873, 36.500000) rotate(-180.000000) translate(-34.890873, -36.500000) translate(21.390873, 29.000000)" fill="#FFFFFF" fill-rule="nonzero"><polygon id="Shape" points="19.5626038 0.0286259542 18.3619245 1.24311069 23.7049245 6.64734733 0 6.64734733 0 8.36490458 23.7049245 8.36490458 18.3619245 13.769084 19.5626038 14.9835687 26.9554528 7.5060687"></polygon></g></g></g></g></svg></a>',
            arrowRight:
                '<a data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}" href="javascript:;"><svg width="71px" height="72px" viewBox="0 0 71 72" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Group"><g><rect id="Rectangle-4" stroke="#FFFFFF" transform="translate(35.390873, 36.000000) rotate(-45.000000) translate(-35.390873, -36.000000) " x="10.890873" y="11.5" width="49" height="49"></rect><g id="right-arrow-copy-2" transform="translate(34.890873, 36.500000) rotate(-180.000000) translate(-34.890873, -36.500000) translate(21.390873, 29.000000)" fill="#FFFFFF" fill-rule="nonzero"><polygon id="Shape" points="19.5626038 0.0286259542 18.3619245 1.24311069 23.7049245 6.64734733 0 6.64734733 0 8.36490458 23.7049245 8.36490458 18.3619245 13.769084 19.5626038 14.9835687 26.9554528 7.5060687"></polygon></g></g></g></g></svg></a>'
        },
        thumbs: {
            autoStart: true,
            hideOnClose: true,
            axis: 'x'
        }
    });

    $('.main-gallery-more a').click(function(e) {
        $('.main-gallery-more').remove();
        $('.main-gallery-item').css({'display': 'inline-block'});
        e.preventDefault();
    });

    $('.rewards-item a').fancybox({
        buttons : [
            'close'
        ],
        lang : 'ru',
        i18n : {
            'ru' : {
                CLOSE   : 'Закрыть',
                NEXT    : 'Вперед',
                PREV    : 'Назад'
            }
        },
        baseTpl:
            '<div class="fancybox-container" role="dialog" tabindex="-1">' +
                '<div class="fancybox-bg"></div>' +
                '<div class="fancybox-toolbar">{{buttons}}</div>' +
                '<div class="fancybox-navigation">{{arrows}}</div>' +
                '<div class="fancybox-inner">' +
                    '<div class="fancybox-stage"></div>' +
                "</div>" +
            "</div>",
        btnTpl: {
            close:
                '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg width="23px" height="23px" viewBox="0 0 23 23" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Pages" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="02_info_gallery_01" transform="translate(-427.000000, -210.000000)" fill="#FFFFFF" fill-rule="nonzero"><g id="multiply-(2)" transform="translate(427.000000, 210.000000)"><polygon id="Shape" points="23 1.04532013 21.9546799 0 11.5 10.4546799 1.04532013 0 0 1.04532013 10.4546799 11.5 0 21.9546799 1.04532013 23 11.5 12.5453201 21.9546799 23 23 21.9546799 12.5453201 11.5"></polygon></g></g></g></svg></button>',
            arrowLeft:
                '<a data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}" href="javascript:;"><svg width="71px" height="72px" viewBox="0 0 71 72" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Group"><g><rect id="Rectangle-4" stroke="#FFFFFF" transform="translate(35.390873, 36.000000) rotate(-45.000000) translate(-35.390873, -36.000000) " x="10.890873" y="11.5" width="49" height="49"></rect><g id="right-arrow-copy-2" transform="translate(34.890873, 36.500000) rotate(-180.000000) translate(-34.890873, -36.500000) translate(21.390873, 29.000000)" fill="#FFFFFF" fill-rule="nonzero"><polygon id="Shape" points="19.5626038 0.0286259542 18.3619245 1.24311069 23.7049245 6.64734733 0 6.64734733 0 8.36490458 23.7049245 8.36490458 18.3619245 13.769084 19.5626038 14.9835687 26.9554528 7.5060687"></polygon></g></g></g></g></svg></a>',
            arrowRight:
                '<a data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}" href="javascript:;"><svg width="71px" height="72px" viewBox="0 0 71 72" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Group"><g><rect id="Rectangle-4" stroke="#FFFFFF" transform="translate(35.390873, 36.000000) rotate(-45.000000) translate(-35.390873, -36.000000) " x="10.890873" y="11.5" width="49" height="49"></rect><g id="right-arrow-copy-2" transform="translate(34.890873, 36.500000) rotate(-180.000000) translate(-34.890873, -36.500000) translate(21.390873, 29.000000)" fill="#FFFFFF" fill-rule="nonzero"><polygon id="Shape" points="19.5626038 0.0286259542 18.3619245 1.24311069 23.7049245 6.64734733 0 6.64734733 0 8.36490458 23.7049245 8.36490458 18.3619245 13.769084 19.5626038 14.9835687 26.9554528 7.5060687"></polygon></g></g></g></g></svg></a>'
        },
        thumbs: {
            autoStart: true,
            hideOnClose: true,
            axis: 'x'
        }
    });

    $('.services-item-link a').click(function(e) {
        $.scrollTo($('.feedback'), 500);
        e.preventDefault();
    });

    $('.plan-map').maphilight();

    var planTimer = null;

    $('body').on('mouseover', '.plan area', function(e) {
        window.clearTimeout(planTimer);
        planTimer = null;
        var curArea = $(this);
        var curIndex = $('.plan area').index(curArea);

        $('.plan-window').css({'display': 'none'});
        var curWindow = $('.plan-window').eq(curIndex);
        if (curWindow.length > 0) {
            curWindow.css({'display': 'block'});
            var curPlan = $('.plan');
            if (curWindow.offset().left + curWindow.outerWidth() > curPlan.offset().left + curPlan.width()) {
                curWindow.addClass('right');
            }
            if (curWindow.offset().top < curPlan.offset().top) {
                curWindow.addClass('top');
            }
        }

        $('.plan area').data('maphilight', {"stroke":false, "fade":false, "fillColor":"2ba856", "fillOpacity":0, "alwaysOn":true});
        $('.plan area').eq(curIndex).data('maphilight', {"stroke":false, "fade":false, "fillColor":"2ba856", "fillOpacity":0.53, "alwaysOn":true});
        $('.plan-map').maphilight();
    });

    $('body').on('mouseout', '.plan area', function(e) {
        window.clearTimeout(planTimer);
        planTimer = null;
        planTimer = window.setTimeout(function() {
            $('.plan area').data('maphilight', {"stroke":false, "fade":false, "fillColor":"2ba856", "fillOpacity":0, "alwaysOn":true});
            $('.plan-map').maphilight();
            $('.plan-window').css({'display': 'none'});
        }, 200);
    });

    $('body').on('mouseover', '.plan-window', function(e) {
        window.clearTimeout(planTimer);
        planTimer = null;
    });

    $('body').on('mouseout', '.plan-window', function(e) {
        window.clearTimeout(planTimer);
        planTimer = null;
        planTimer = window.setTimeout(function() {
            $('.plan area').data('maphilight', {"stroke":false, "fade":false, "fillColor":"2ba856", "fillOpacity":0, "alwaysOn":true});
            $('.plan-map').maphilight();
            $('.plan-window').css({'display': 'none'});
        }, 200);
    });

    $(window).on('load resize scroll', function() {
        if ($(window).scrollTop() > 53) {
            $('html').addClass('header-fixed');
        } else {
            if (!($('html').data('scrollTop') > 0)) {
                $('html').removeClass('header-fixed');
            }
        }

        if ($(window).scrollTop() > $(window).height()) {
            $('.link-to-up').addClass('visible');
            var curFooter = ($('footer').offset().top - 15) - ($(window).scrollTop() + $(window).height());
            if (curFooter < 0) {
                $('.link-to-up').css({'bottom': -curFooter});
            } else {
                $('.link-to-up').css({'bottom': 15});
            }
        } else {
            $('.link-to-up').removeClass('visible');
        }
    });

    $('.link-to-up a').click(function(e) {
        $.scrollTo(0, 500);
        e.preventDefault();
    });

    $('.mobile-menu-link').click(function(e) {
        $('html').toggleClass('mobile-menu-open');
        e.preventDefault();
    });

    $('nav a').click(function(e) {
        if ($('html').hasClass('mobile-menu-open')) {
            var curLi = $(this).parent();
            if (curLi.find('.nav-arrow').length > 0) {
                curLi.toggleClass('hover');
                e.preventDefault();
            }
        }
    });

    $('.side-menu-current').click(function(e) {
        $('.side-menu').toggleClass('open');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.side-menu').length == 0) {
            $('.side-menu').removeClass('open');
        }
    });

    $('.services-menu-current').click(function(e) {
        $('.services-menu').toggleClass('open');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.services-menu').length == 0) {
            $('.services-menu').removeClass('open');
        }
    });

    $('body').on('click', '.window-link', function(e) {
        var curLink = $(this);
        var curStart = 0;
        if (curLink.data('gallery-start')) {
            curStart = Number(curLink.data('gallery-start') - 1);
        }
        windowOpen(curLink.attr('href'), curStart);
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('window')) {
            windowClose();
        }
    });

    $(window).resize(function() {
        windowPosition();
    });

    $('body').on('click', '.window-close', function(e) {
        windowClose();
        e.preventDefault();
    });

});

$(window).on('resize', function() {
    $('.form-select select').chosen('destroy');
    $('.form-select select').chosen({disable_search: true, placeholder_text_multiple: ' ', no_results_text: 'Нет результатов'});
    $('.form-select select').each(function() {
        var curSelect = $(this);
        if (curSelect.data('placeholder') != '') {
            curSelect.parent().find('.chosen-single').prepend('<strong>' + curSelect.data('placeholder') + '</strong>');
        }
    });
});

function initForm(curForm) {
    curForm.find('input.maskPhone').mask('+7 (999) 999-99-99');

    curForm.find('.form-input input, .form-input textarea').each(function() {
        if ($(this).val() != '') {
            $(this).parent().addClass('focus');
        }
    });

    curForm.find('.form-input input, .form-input textarea').focus(function() {
        $(this).parent().addClass('focus');
    });

    curForm.find('.form-input input, .form-input textarea').blur(function() {
        if ($(this).val() == '') {
            $(this).parent().removeClass('focus');
        }
    });

    curForm.find('.form-select select').chosen({disable_search: true, no_results_text: 'Нет результатов'});
    curForm.find('.form-select select').each(function() {
        var curSelect = $(this);
        if (curSelect.data('placeholder') != '') {
            curSelect.parent().find('.chosen-single').prepend('<strong>' + curSelect.data('placeholder') + '</strong>');
        }
    });


    curForm.find('.form-file input').change(function() {
        var curInput = $(this);
        var curField = curInput.parent().parent().parent().parent();
        curField.find('.form-file-name-text').html(curInput.val().replace(/.*(\/|\\)/, ''));
        curField.find('label.error').remove();
        curField.removeClass('error');
    });

    curForm.find('.form-file-name-remove').click(function() {
        var curField = $(this).parents().filter('.form-file');
        curField.find('.form-file-name-text').html('');
        curField.find('input').val(null);
    });

    curForm.find('.form-reset a').click(function(e) {
        curForm.trigger('reset');

        curForm.find('.form-input input, .form-input textarea').each(function() {
            $(this).parent().removeClass('focus');
        });

        curForm.find('label.error').remove();
        curForm.find('.error').removeClass('error');
        curForm.find('.valid').removeClass('valid');

        curForm.find('.form-file-name-remove').trigger('click');

        window.setTimeout(function() {
            curForm.find('.form-select select').chosen('destroy');
            curForm.find('.form-select select').chosen({disable_search: true, hide_results_on_select: false, placeholder_text_multiple: ' ', no_results_text: 'Нет результатов'});
        }, 100);

        e.preventDefault();
    });

    curForm.validate({
        ignore: '',
        invalidHandler: function(form, validatorcalc) {
            validatorcalc.showErrors();
            checkErrors();
        },
        submitHandler: function(form) {
            if ($(form).hasClass('ajax-form')) {
                $(form).find('.form-success, .form-error').remove();
                $(form).append('<div class="loading"></div>');
                $.ajax({
                    type: 'POST',
                    url: $(form).attr('action'),
                    dataType: 'html',
                    data: $(form).serialize(),
                    cache: false
                }).done(function(html) {
                    $(form).find('.loading').remove();
                    $(form).append(html);
                });
            } else {
                form.submit();
            }
        }
    });
}

function checkErrors() {
    $('.form-checkbox, .form-file, .form-input').each(function() {
        var curField = $(this);
        if (curField.find('input.error').length > 0) {
            curField.addClass('error');
        } else {
            curField.removeClass('error');
        }
        if (curField.find('input.valid').length > 0) {
            curField.addClass('valid');
        } else {
            curField.removeClass('valid');
        }
    });

    $('.form-select').each(function() {
        var curField = $(this).parent().parent();
        if (curField.find('select.error').length > 0) {
            curField.addClass('error');
        } else {
            curField.removeClass('error');
        }
        if (curField.find('select.valid').length > 0) {
            curField.addClass('valid');
        } else {
            curField.removeClass('valid');
        }
    });
}


function windowOpen(linkWindow, dataWindow, callbackWindow) {
    var curPadding = $('.wrapper').width();
    $('html').addClass('window-open');
    curPadding = $('.wrapper').width() - curPadding;
    $('body').css({'margin-right': curPadding + 'px'});

    if ($('.window').length == 0) {
        $('body').append('<div class="window"><div class="window-loading"></div></div>')
    }

    $.ajax({
        type: 'POST',
        url: linkWindow,
        dataType: 'html',
        data: dataWindow,
        cache: false
    }).done(function(html) {
        if ($('.window').length > 0) {
            $('.window').remove();
        }
        $('body').append('<div class="window"><div class="window-loading"></div></div>')

        $('.window').append('<div class="window-container window-container-load"><div class="window-content">' + html + '<a href="#" class="window-close"></a></div></div>')

        if ($('.window-container img').length > 0) {
            $('.window-container img').each(function() {
                $(this).attr('src', $(this).attr('src'));
            });
            $('.window-container').data('curImg', 0);
            $('.window-container img').one('load', function() {
                var curImg = $('.window-container').data('curImg');
                curImg++;
                $('.window-container').data('curImg', curImg);
                if ($('.window-container img').length == curImg) {
                    $('.window-container').removeClass('window-container-load');
                    windowPosition();
                }
            });
        } else {
            $('.window-container').removeClass('window-container-load');
            windowPosition();
        }

        if (typeof (callbackWindow) != 'undefined') {
            callbackWindow.call();
        }

        $('.window form').each(function() {
            initForm($(this));
        });
    });
}

function windowPosition() {
    if ($('.window').length > 0) {
        $('.window-container').css({'left': '50%', 'margin-left': -$('.window-container').width() / 2});

        $('.window-container').css({'top': '50%', 'margin-top': -$('.window-container').height() / 2, 'padding-bottom': 0});
        if ($('.window-container').height() > $('.window').height() - 60) {
            $('.window-container').css({'top': '30px', 'margin-top': 0, 'padding-bottom': 30});
        }
    }
}

function windowClose() {
    if ($('.window').length > 0) {
        $('.window').remove();
        $('html').removeClass('window-open');
        $('body').css({'margin-right': 0});
    }
}