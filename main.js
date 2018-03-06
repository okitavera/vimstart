var stylishHTML = function (conf) {
    $("*").css("background", conf.background)
    $("*").css("color", conf.foreground)
    $("#logo").html(conf.greeting_text)
    $("#cheat li span:first-child").css("color", conf.background)

    if (tinycolor(conf.foreground).isLight()) {
        $("#cheat li span:first-child").css("background","rgba(200,200,200, 0.8)");
        $("#cheat li span:last-child ").css("background","rgba(0,0,0, 0.4)");
    } else {
        $("#cheat li span:first-child").css("background","rgba(0,0,0, 0.4)");
        $("#cheat li span:last-child ").css("background","rgba(200,200,200, 0.8)");
    }
}

$(function () {
    var conf = {};

    $("#cheatp").hide()

    $.getJSON("web.json", function (object) {
        $.each(object.favourites, function (key, val) {
            var key = val.key;
            var val = val.url;
            $('#cheat ul').append($('<li>').html('<a href="' + val + '" target="_blank"><span>' + key + '</span><span>' + val + '</span></a>'))
            stylishHTML(object)
        });

        $("ul li").sort(function (a, b) {
            return ($(a).width() < $(b).width()) ? -1 : ($(a).width() > $(b).width()) ? 1 : 0;
        }).appendTo('ul');

        return conf = object;
    });

    $(document).keydown(function (e) {
        if (e.shiftKey && e.keyCode == 59) {
            $("#box").focus()
        }

        if (e.keyCode == 27) {
            $("#box").blur()
            $("#box").val('')
            $('#holder').html("type  :&lt;key&gt;  and  hit enter");
            $('#cheat ul li').each(function () {
                $(this).removeClass('dis')
            });
        }
    });

    $('#box').keyup(function (event) {
        var text = $(this).val()

        if ($('#box').val().length == 0) {
            $("#cheatp").slideUp()
        } else {
            $("#cheatp").slideDown()
        }

        $('#cheat ul li').each(function () {
            $(this).addClass('dis')
            if ($(this).html().indexOf(text) != -1) {
                $(this).removeClass('dis')
            }

        });
    });

    $("form").on("submit", function (e) {
        e.preventDefault()
        e.stopPropagation()

        var input = $(this).find("#box").val()
        var search = new RegExp('^:s (.*)$')
        var site = new RegExp('^:u (.*)$')

        if (search.test(input)) {
            link = "https://www.google.co.id/search?q=" + encodeURIComponent(input.replace(/^\:s /g, ''))
        } else if (site.test(input)) {
            link = input.replace(/^\:u /g, '')
        } else {
            $.each(conf.favourites, function () {
                if (this.key === input) link = this.url
            });
        }

        if (!~link.indexOf("http")) {
            link = "http://" + link
        }

        window.open(link, '_blank')
        $("#box").blur()
        $("#box").val('')
        $("#cheatp").slideUp()
    });
});
