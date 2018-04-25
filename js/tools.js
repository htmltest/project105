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

    $('.main-gallery-item a, .rewards-item a').click(function(e) {
        $('html').data('scrollTop', $(window).scrollTop());
        $('.wrapper').css('margin-top', -$(window).scrollTop());
        e.preventDefault();
    });

    $('.main-gallery-item a').fancybox({
        prevEffect: 'none',
        nextEffect: 'none',
        margin: 20,
        padding: 0,
        maxWidth: 970,
        minWidth: 440,
        aspectRatio: true,
        tpl : {
            closeBtn : '<a title="Закрыть" class="fancybox-item fancybox-close" href="javascript:;"></a>',
            next     : '<a title="Следующая" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
            prev     : '<a title="Предыдущая" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
        },
        helpers: {
			thumbs	: {
				width	: 108,
				height	: 108
			}
        },
        closeEffect: 'none',
        closeSpeed: 0
    });

    $('.main-gallery-more a').click(function(e) {
        $('.main-gallery-more').remove();
        $('.main-gallery-item').css({'display': 'inline-block'});
        e.preventDefault();
    });

    $('.rewards-item a').fancybox({
        prevEffect: 'none',
        nextEffect: 'none',
        margin: 20,
        padding: 0,
        maxWidth: 970,
        minWidth: 440,
        aspectRatio: true,
        tpl : {
            closeBtn : '<a title="Закрыть" class="fancybox-item fancybox-close" href="javascript:;"></a>',
            next     : '<a title="Следующая" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
            prev     : '<a title="Предыдущая" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
        },
        closeEffect: 'none',
        closeSpeed: 0
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