$(document).ready(function(){

    checkWidth();
    $(window).resize(function() { checkWidth(); })
    function checkWidth() {
        if ($(window).width() <= 1200) {
            $("body").addClass("mobile");
        } else {
            $("body").removeClass("mobile");
            $(".mobileMenu").css({ "transition": "none" })
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
    let conHeight = $("#pullup .hero").height();
    let imgHeight = $("#pullup .hero img").height();
    let gap = (imgHeight - conHeight) / 2;
    $("#pullup .hero img").css("top", -gap);


    // Logo Randomizer ---------------------------------------------------------------
    let logo = document.getElementById("logo");
    let oneOrZero = (Math.random()>0.75)? 1 : 0; // 1/4 chance of cake?
    if(oneOrZero === 1) { logo.classList.add("cake"); }

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

        console.log(PROJECTDESC);

        setPullup();
    });

    $("#about").click(function() { 
        removeNavLinksAll();
        $("#pullupContent .fullDescription").load("pages/nav/about.html"); 
        $("#pullupContent .hero").css({ 
            "background": "url(images/about/banner-about.jpg)", 
            "background-position":"50% 50%",
            "background-size":"cover",
            "background-repeat":"no-repeat" 
        });
        $("#pullupContent .hero h1").html("Sometimes I bake..."); /* Project Name Setup */
        $("#pullupContent .hero p").html("");
        setPullup(); /* Project Content Setup */
    });

    $("#contact").click(function(){ 
        removeNavLinksAll();
        $("#navlinksPopup").addClass("engaged");
        $("#navlinksPopup").addClass("contact");
    });
    $("#pricing").click(function(){ 
        removeNavLinksAll();
        $("#navlinksPopup").addClass("engaged");
        $("#navlinksPopup").addClass("pricing");
    });
    $("#cookieDrop").click(function(){ 
        removeNavLinksAll();
        $("#navlinksPopup").addClass("engaged");
        $("#navlinksPopup").addClass("cookieDrop");
    });

    $("#navlinksPopup").on("click",function(e){
        if (e.target.id !== 'navlinksPopup') return;
        $("#navlinksPopup").removeClass("engaged");
        removeNavLinksAll();
    });
    function removeNavLinksAll() {
        $("#navlinksPopup").removeClass("engaged");
        $("#navlinksPopup").removeClass("about");
        $("#navlinksPopup").removeClass("contact");
        $("#navlinksPopup").removeClass("pricing");
        $("#navlinksPopup").removeClass("cookieDrop");
        commissionReset();
    }

    function setPullup() {
        $("#pullupContent").addClass("show");
        
        $("#pullup").addClass("setScroll");
        $("#pullup").scrollTop(0);
        $("#pullup").removeClass("setScroll");

        $("#pullup").addClass("show"); 
        preventBack();
    }

    $("#pullupToggle").click(function() { hidePullup() });
    $("#logo").click(function() { 
        hidePullup();
        removeNavLinksAll();
    });
    function hidePullup(){
        $("#pullup").removeClass("show").scrollTop(0);
    }

    // Image Zooming -----------------------------------------------------------------

    document.body.addEventListener('click', handleClick);
    function handleClick(event) {
        let clickedElement = event.target;
        // Check if the clicked element's tag name is 'IMG' (case-insensitive)
        if (clickedElement.tagName === 'IMG') { clickedElement.classList.toggle("fullScreenImg");
        } else { removeClassFromAll('fullScreenImg'); }
    }

    function removeClassFromAll(classNameToRemove) {
        // Select all elements that currently have the specified class name
        let elements = document.querySelectorAll(`.${classNameToRemove}`);
        // Iterate over the collection of elements and remove the class from each
        elements.forEach(element => { element.classList.remove(classNameToRemove); });
    }
    
    // COMMISSION INFO --------------------------------------------------------------------------

    $(".commissionInfoToggle").click(function(){ $(this).parent().parent().toggleClass("showCommissionInfo"); });
    $("#commissionInfoButton").click(function(){ $(this).parent().parent().removeClass("showCommissionInfo"); });

    function commissionReset() {
        $(".contactContent").removeClass("showCommissionInfo");
        // $(".commissionInfo").scrollTop = 0; //TODO: NOT WORKING
    }

    // HANDLE BACK BUTTON -----------------------------------------------------------------------

    function preventBack() { window.history.pushState(null, "", window.location.href); } // Function to push current state into history stack

    // Listen for the 'popstate' event (triggered by back/forward buttons)
    window.onpopstate = function() { 
        preventBack();  // Immediately push state back to trap the user on this page
        removeNavLinksAll();
        hidePullup();
        $("#navlinksPopup").removeClass("engaged");
    };
})
