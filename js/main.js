var notificationModel = 0;
var notificationLevel = 0;
var privacyControl = 0;
var privacyControlOn = 1;
var notificationOn = 1;
var intruderPositionX = 0;
var intruderPositionY = 0;
/*
notificationModel =>> 0 - No notification; 1 - Simple notification; 2 - Colorful notification; 3 - Level notification;
notificationLevel =>> 0 - Far(hidden); 1 - Attention; 2 - Close; 3 - Very close; 
privacyControl =>> 0 - No control; 1 - Selective hiding; 2 - Gray scale; 3 -Brightness; 
*/

/*** SIDE MENU: Begin ***/
$(document).ready(function () {
    $(".menu-anchor").on("click touchstart", function (e) {
        $("html").toggleClass("menu-active");
        e.preventDefault();
    });
});
/*** SIDE MENU: End ***/

/*** MORE LINK: Begin ***/
$(document).ready(function () {
    var showChar = 500;
    var ellipsestext = "...";
    var moretext = "Read more <span class=\"caret\"> </span>";
    var lesstext = "Read more <span class=\"caret up\"> </span>";
    $(".more").each(function () {
        var content = $(this).html();
        if (content.length > showChar) {
            var c = content.substr(0, showChar);
            var h = content.substr(showChar - 1, content.length - showChar);
            var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + ' </a></span> ';
            $(this).html(html);
        }
    });

    $(".morelink").click(function () {
        if ($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });
});
/*** MORE LINK: End ***/

/*** CHART: Begin ***/
$(function () {
    $("#patient-chart").highcharts({
        title: {
            text: 'Scars treatment',
            x: -20 //center
        },

        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'Evolution'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#b4b4b4'
                }]
        },
        tooltip: {
            valueSuffix: ''
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Hands',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            }, {
            name: 'Arms',
            data: [0, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
            }, {
            name: 'Back',
            data: [0, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
            }, {
            name: 'Legs',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
            }]
    });
});
/*** CHART: End ***/

/*** NOTIFICATION: Begin ***/
//Initializing drag and drop
$("body .notification").pep({
    useCSSTranslation: false,
    constrainTo: 'parent'
});

//Keep the notification inside the boundaries of the window
$(window).on("resize", function () {
    var win = $(this);
    var notification = $(".notification");
    if (win.height() <= notification.position().top + 150) {
        notification.css("top", win.height() - 150);
    }
    if (win.width() <= notification.position().left + 150) {
        notification.css("left", win.width() - 150);
    }
});

//Closing method for notification
$(".notification .close-notification").on("click touchstart", function (e) {
    e.preventDefault();
    $(".notification").fadeOut(500);
});

//Initializing tooltips
$(document).ready(function () {
    $(".tooltips").tooltip();
});

//Changing notifications model
function changeNotification(model) {
    if (model != Number.NaN && model >= 0 || model <= 4) {
        $(".notification").stop(true, true).removeClass("model0").removeClass("model1").removeClass("model2").removeClass("model3").removeClass("model4").removeClass("model5");
        $(".notification").addClass("model" + model);
        notificationModel = model;
        if (model != 0) {
            $(".notification").fadeTo(500, 100);
        }
    }
}
//Changing notifications level
function changeLevel(level) {
    if (level != Number.NaN && level >= 0 || level <= 3) {
        $(".notification").removeClass("level0").removeClass("level1").removeClass("level2").removeClass("level3");
        $(".notification").addClass("level" + level);
        if (level == 2 || level == 3) {
            //turn on the privacy control
            $("#content").removeClass("turnoff");
            $("#modalPictures").removeClass("turnoff");
        } else {
            //turn off the privacy control
            $("#content").addClass("turnoff");
            $("#modalPictures").addClass("turnoff");
        }
    }
    notificationLevel = level;
}
}
//Switching Control
function switchControl(turn) {
    if (turn != Number.NaN && turn >= 0 || turn <= 1) {
        if (turn != 1) {
            $("#content").removeClass("turnoff");
            $("#modalPictures").removeClass("turnoff");
        } else {
            $("#content").addClass("turnoff");
            $("#modalPictures").addClass("turnoff");
        }
        privacyControlOn = turn;
    }
}
//Switching Notification
function switchNotification(turn) {
    if (turn != Number.NaN && turn >= 0 || turn <= 1) {
        if (turn != 1) {
            $(".notification").removeClass("turnoff");
        } else {
            $(".notification").addClass("turnoff");
        }
        notificationOn = turn;
    }
}
//Changing intruder position
function changeIntruderPosition(x, y, angle) {
    if (x != Number.NaN && y != Number.NaN) {
        $(".notification.model4 .point-intruder").css("top", x + "%");
        $(".notification.model4 .point-intruder").css("left", y + "%");
        intruderPositionX = x;
        intruderPositionY = y;
    }
}
/*** NOTIFICATION: End ***/

/*** CONTROL: Begin ***/
//Changing control
function changeControl(control) {
    if (control != Number.NaN && control >= 0 || control <= 3) {
        $("#content").removeClass("no-control").removeClass("selective-hiding").removeClass("gray-scale").removeClass("brightness").removeClass("lantern");
        $("#modalPictures").removeClass("no-control").removeClass("selective-hiding").removeClass("gray-scale").removeClass("brightness-modal").removeClass("lantern");
        switch (control) {
        case 0:
            $("#content").addClass("no-control");
            $("#modalPictures").addClass("no-control");
            break;
        case 1:
            $("#content").addClass("selective-hiding");
            $("#modalPictures").addClass("selective-hiding");
            break;
        case 2:
            $("#content").addClass("gray-scale");
            $("#modalPictures").addClass("gray-scale");
            break;
        case 3:
            $("#content").addClass("brightness");
            $("#modalPictures").addClass("brightness-modal");
            break;
        case 4:
            $("#content").addClass("lantern");
            $("#modalPictures").addClass("lantern");
            break;
        default:
            $("#content").addClass("no-control");
            $("#modalPictures").addClass("no-control");
        }
        privacyControl = control;
    }
}

(function ($) {
    $.fn.touchToScroll = function () {

        var touchToScrollHandlers = {
            touchStart: function (event) {
                var e = $(this);
                var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
                var data = {
                    element: e,
                    x: touch.pageX,
                    y: touch.pageY,
                    scrollX: e.scrollLeft(),
                    scrollY: e.scrollTop()
                };
                $(document).bind("touchend", data, touchToScrollHandlers.touchEnd);
                $(document).bind("touchmove", data, touchToScrollHandlers.touchMove);
            },
            touchMove: function (event) {
                event.preventDefault();
                var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
                var delta = {
                    x: (touch.pageX - event.data.x),
                    y: (touch.pageY - event.data.y)
                };
                event.data.element.scrollLeft(event.data.scrollX - delta.x);
                event.data.element.scrollTop(event.data.scrollY - delta.y);
            },
            touchEnd: function (event) {
                $(document).unbind("touchmove", touchToScrollHandlers.touchMove);
                $(document).unbind("touchend", touchToScrollHandlers.touchEnd);
            }
        }

        this.bind("touchstart", touchToScrollHandlers.touchStart);
        return this;
    };
})(jQuery);

$(document).ready(function () {
    var currentMousePos = {
        x: -1,
        y: -1
    };
    //$('#main').touchToScroll();
    $('.content').touchToScroll();
    $(".notification").removeClass("model0").removeClass("model1").removeClass("model2").removeClass("model3").removeClass("model4").removeClass("model5").addClass("model0").removeClass("level0").removeClass("level1").removeClass("level2").removeClass("level3").addClass("level3");
    $(document).mousemove(function (event) {
        currentMousePos.x = event.pageX;
        currentMousePos.y = event.pageY;
        $(".lantern").css("-webkit-mask-position-x", currentMousePos.x - 3435).css("-webkit-mask-position-y", currentMousePos.y - 2550);
    }).mouseleave(function (e) {
        $(".lantern").css("-webkit-mask-position-x", 0).css("-webkit-mask-position-y", 0);
    });

});

window.addEventListener('load', function (e) {

    var startTouchX = 0;
    var endTouchX = 0;
    var touch_x;
    var touch_y;
    var scrollStartPos = 0;

    $(document).on('MSPointerMove touchmove mousemove MSPointerDown touchstart mousedown MSPointerUp touchend mouseup scroll draginit scrollstart wheel mousewheel', function (e) {
        if (("MSPointerEvent" in window) || !(e.type.search('touch') > -1)) {

            if (e.pageX) {
                touch_x = e.pageX;
                touch_y = e.pageY;
            } else {
                touch_x = e.originalEvent.pageX;
                touch_y = e.originalEvent.pageY;
            }

        } else {
            if (e.originalEvent.touches[0]) {
                touch_x = e.originalEvent.touches[0].pageX;
                touch_y = e.originalEvent.touches[0].pageY;
            }
        }
        $(".patient-name").text(e.type + touch_x);
    });
    document.addEventListener('touchstart', function (e) {
        if ($("html").hasClass("menu-active")) {
            startTouchX = touch_x;
        }
        if ($("#content").hasClass("lantern")) {
            $(".lantern").css("-webkit-mask-position-x", touch_x - 3435).css("-webkit-mask-position-y", touch_y - 2550);
        }

    }, false);

    document.addEventListener('touchmove', function (e) {
        //e.preventDefault();

        if ($("html").hasClass("menu-active")) {
            endTouchX = touch_x;
            if (endTouchX + 10 < startTouchX) {
                $("html").removeClass("menu-active");
                startTouchX = 0;
                endTouchX = 0;
            }
        }

        if ($("#content").hasClass("lantern")) {
            //e.preventDefault();
            $(".lantern").css("-webkit-mask-position-x", touch_x - 3435).css("-webkit-mask-position-y", touch_y - 2550);
        }
    }, false);

    document.addEventListener('touchend', function (e) {
        if ($("html").hasClass("menu-active")) {
            endTouchX = touch_x;
            if (endTouchX + 10 < startTouchX) {
                $("html").removeClass("menu-active");
                startTouchX = 0;
                endTouchX = 0;
            }
        }
        if ($("#content").hasClass("lantern")) {
            $(".lantern").css("-webkit-mask-position-x", touch_x - 3435).css("-webkit-mask-position-y", touch_y - 2550);
        }
    }, false);

}, false);


/*** CONTROL: End ***/

/*** SWITCHERS: Begin ***/
$(".turnNotification").click(function (e) {
    if ($(".turnNotification").prop('checked')) {
        switchNotification(0);
    } else {
        switchNotification(1);
    }
});


$(".turnPrivacy").click(function (e) {
    if ($(".turnPrivacy").prop('checked')) {
        switchControl(0);
    } else {
        switchControl(1);
    }
});
/*** SWITCHERS: End ***/

/*** MODAL: Begin ***/
$(".linkmodal").click(function (e) {
    $("#modalPictures img").attr("src", $(this).attr("data-img-url"));
});

/*** MODAL: End ***/