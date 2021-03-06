(function ($) {
    function checkForElementsToAnimate() {
        var jsAnimateSelector = $('.js-animate-when-visible'),
            onScreenOffsetX = 0.2,
            onScreenOffsetY = 0.2,
            mobOnScreenOffsetX = 0.05,
            mobOnScreenOffsetY = 0.05,
            wysiwygOnScreenOffsetX = 0.25,
            wysiwygOnScreenOffsetY = 0.25,
            onScreenBreakPoint = 800,
            onScreen;

        jsAnimateSelector.each(function () {
            var delayAnimation = $(this).data('delay-animation'),
                alreadyOnScreen = $(this).offset().top < $(window).scrollTop(),
                wysiwygChildOnScreen = $(this).hasClass('wysiwyg') && $(this).children().isOnScreen(wysiwygOnScreenOffsetX, wysiwygOnScreenOffsetY);

            if ($(window).width() < onScreenBreakPoint) {
                onScreen = $(this).isOnScreen(mobOnScreenOffsetX, mobOnScreenOffsetY);
            } else {
                onScreen = $(this).isOnScreen(onScreenOffsetX, onScreenOffsetY);
            }

            if (onScreen || alreadyOnScreen || wysiwygChildOnScreen) {
                if (delayAnimation) {
                    $(this).css('animation-delay', delayAnimation);
                }
                $(this).addClass('animate').removeClass('js-animate-when-visible');
            }
        });
    }

    function changeVideoPlayState() {
        var onScreenOffsetX = 0.2,
            onScreenOffsetY = 0.2;

        if ($('.hero-banner__video').isOnScreen(onScreenOffsetX, onScreenOffsetY) && $('.hero-banner').is(':visible')) {
            $('.hero-banner__video').get(0).play();
        } else {
            $('.hero-banner__video').get(0).pause();
        }
    }

    $(window).on('load resize scroll', function () {
        checkForElementsToAnimate();
        changeVideoPlayState();
    });

    setTimeout(function () {
        $('.hero-banner__video').get(0).play();
    }, 2000);
})(jQuery);
