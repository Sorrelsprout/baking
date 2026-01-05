$(document).ready(function(){

    checkWidth();
    $(window).resize(function() { checkWidth(); })
    function checkWidth() {
        if ($(window).width() < 1200) {
            $("body").addClass("mobile");
        } else {
            $("body").removeClass("mobile");
            $(".mobileMenu").css({ "transition": "none" })
        }

        if ($(window).width() < 768) {
            $("#travelLogTitle").attr("src", "./images/about/travellog-mobile.png");
        } else {
            $("#travelLogTitle").attr("src", "./images/about/travellog.png");
        }
    }

    $(".triplebar").click(function() {
        $(".mobileMenu").css({ 
            "transition": "all 0.5s cubic-bezier(0.5, 0, 0.5, 1)",
            "transition-timing-function":"cubic-bezier(0.5, 0, 0.5, 1)"
        })
        $(".mobileMenu").toggleClass("expanded");;
    });
    $(".mobile .mobileMenu a").click(function() {
        $(".mobileMenu").removeClass("expanded");;
    });

    $(".currentYear").html(new Date().getFullYear());


    // Hero Fix ----------------------------------------------------------------------
    var conHeight = $("#pullup .hero").height();
    var imgHeight = $("#pullup .hero img").height();
    var gap = (imgHeight - conHeight) / 2;
    $("#pullup .hero img").css("top", -gap);



    // Pullup ------------------------------------------------------------------------
    $(".projectContainer").click(function() { 
        /* Get Project ID */
        const PROJECTINDEX = $(this).index();
        const PROJECTID = $(".projectContainer:nth-child("+(PROJECTINDEX+1)+")").attr("id");
        const PYEAR = PROJECTID.substring(0, PROJECTID.indexOf("-"));

        /* Project Hero Image Setup */
        const PROJECTIMGURL = $("#"+(PROJECTID)+" img").attr("src")
        const PROJECTHERO = "url("+PROJECTIMGURL+")";
        $("#pullupContent .hero").css({ 
            "background":PROJECTHERO, 
            "background-position":"50% 50%",
            "background-size":"cover",
            "background-repeat":"no-repeat" 
        });

        /* Project Name Setup */
        const PNAME = "#"+(PROJECTID)+" p:first-of-type";
        const PROJECTNAME = $(PNAME).html();
        $("#pullupContent .hero h1").html(PROJECTNAME);
        const PSUB = "#"+(PROJECTID)+" p:nth-child(2)";
        const PSUBNAME = $(PSUB).text();
        $("#pullupContent .hero p").html(PSUBNAME);

        /* Project Content Setup */
        const PROJECTDESC = "pages/" + (PYEAR) + "/" + (PROJECTID) + ".html"
        $("#pullupContent .fullDescription").load(PROJECTDESC); 

        console.log(PROJECTDESC)

        setPullup();
    });

    $("#about").click(function() { 
        $("#pullupContent .fullDescription").load("pages/about.html"); 
        $("#pullupContent .hero").css({ 
            "background": "url(images/about/banner-about.jpg)", 
            "background-position":"50% 50%",
            "background-size":"cover",
            "background-repeat":"no-repeat" 
        });
        $("#pullupContent .hero h1").html("About Sorrel"); /* Project Name Setup */
        $("#pullupContent .hero p").html("");
        setPullup(); /* Project Content Setup */
    });

    $("#cardwelling").click(function() {
        $("#pullupContent .fullDescription").load("pages/cardwelling.html"); 
        $("#pullupContent .hero").css({ 
            // "background":"url(images/cardwelling/banner-cardwelling.jpg)", 
            "background":"url(https://images.unsplash.com/photo-1589830517302-44c51f875686?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80)", 
            "background-position":"50% 50%",
            "background-size":"cover",
            "background-repeat":"no-repeat" 
        });
        $("#pullupContent .hero h1").html("Car Dwelling"); /* Project Name Setup */
        $("#pullupContent .hero p").html("");
        setPullup(); /* Project Content Setup */
    });

    function setPullup() {
        $("#pullupContent").addClass("show");
        $("#pullup").addClass("show"); 
    }

    $("#pullupToggle").click(function() { hidePullup() });
    $("#travel").click(function() { hidePullup() });
    $("#logo").click(function() { hidePullup() });
    function hidePullup(){
        $("#pullup").removeClass("show").scrollTop(0);
    }
})
