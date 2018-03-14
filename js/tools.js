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
        dots: true
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
        curField.find('.form-file-name').html(curInput.val().replace(/.*(\/|\\)/, ''));
        curField.find('label.error').remove();
        curField.removeClass('error');
    });

    curForm.find('.form-reset a').click(function(e) {
        curForm.trigger('reset');

        curForm.find('.form-input input, .form-input textarea').each(function() {
            $(this).parent().removeClass('focus');
        });

        curForm.find('label.error').remove();
        curForm.find('.error').removeClass('error');
        curForm.find('.valid').removeClass('valid');

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