var stylishHTML = function (conf) {
    $("*").css("background", conf.background);
    $("*").css("color", conf.foreground);
    $("#logo").html(conf.greeting_text);
    $("#cheat li span:first-child").css("color", conf.background);

    if (tinycolor(conf.foreground).isLight()) {
        $("#cheat li span:first-child").css("background","rgba(200,200,200, 0.8)");
        $("#cheat li span:last-child ").css("background","rgba(0,0,0, 0.4)");
    } else {
        $("#cheat li span:first-child").css("background","rgba(0,0,0, 0.4)");
        $("#cheat li span:last-child ").css("background","rgba(200,200,200, 0.8)");
    }
};

$(function () {
    var conf = {};
    var notfavs = new RegExp("^:[u|s] (.*)$");
    var search = new RegExp("^:s (.*)$");
    var site = new RegExp("^:u (.*)$");
    var input = $("#box").val();

    $.getJSON("web.json", function (object) {
        $.each(object.favourites, function (key, val) {
            $("#cheat ul").append("<li><a href='" + val.url + "' target='_blank'><span>" + val.key + "</span><span>" + val.url + "</span></a></li>");
            stylishHTML(object);
        });

        $("ul li").sort(function (a, b) {
            return ($(a).width() < $(b).width()) ? -1 : ($(a).width() > $(b).width()) ? 1 : 0;
        }).appendTo("ul");

        conf = object;
    });

    $(document).keydown(function (e) {
        if (e.shiftKey && e.keyCode === 59) {
            $("#box").focus();
        }

        if (e.keyCode === 27) {
            $("#box").blur();
            $("#box").val("");
            $("#cheatp").slideUp();
            $("#holder").html("type  :&lt;key&gt;  and  hit enter");
            $("#cheat ul li").each(function () {
                $(this).removeClass("dis");
            });
        }
    });

    $("#box").keyup(function (event) {
        input = $(this).val();

        if (input.length == 0 || notfavs.test(input)) {
            $("#cheatp").slideUp();
        } else {
            $("#cheatp").slideDown();
        }

        $("#cheat ul li").each(function () {
            $(this).addClass("dis");
            if ($(this).html().indexOf(input) > 0) {
                $(this).removeClass("dis");
            }

        });
    });
    $("form").on("submit", function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (search.test(input)) {
            link = conf.search_engine + encodeURIComponent(input.replace(/^:s /g, ""));
        } else if (site.test(input)) {
            link = input.replace(/^:u /g, "");
        } else {
            $.each(conf.favourites, function () {
                if (this.key === input) {
                    link = this.url;
                }
            });
        }

        if (!~link.indexOf("http")) {
            link = "http://" + link;
        }

        window.open(link, "_blank");
        $("#box").blur();
        $("#box").val("");
        $("#cheatp").slideUp();
    });
});
