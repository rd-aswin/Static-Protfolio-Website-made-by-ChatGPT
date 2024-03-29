$(document).ready(function () {
    // Toggle Menu
    $("#toggleMenu").click(function () {
        $("#mobileMenu").slideToggle();
    });

    // Smooth scrolling to portfolio section
    $("#explore-btn").click(function () {
        $("html, body").animate({
            scrollTop: $("#portfolio").offset().top,
        }, 1000);
    });

    // Lightbox functionality
    $(".portfolio-item").click(function () {
        var imageUrl = $(this).find("img").attr("src");
        var imageAlt = $(this).find("img").attr("alt");
        var lightboxHtml =
            '<div id="portfolio-showcase" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50">';
        lightboxHtml +=
            '<div class="max-w-lg bg-white rounded-lg overflow-hidden">';
        lightboxHtml +=
            '<img src="' + imageUrl + '" alt="' + imageAlt + '" class="w-full">';
        lightboxHtml +=
            '<button id="close-lightbox" class="absolute top-0 right-0 mr-4 mt-4 text-white text-2xl">&times;</button>';
        lightboxHtml += "</div></div>";
        $("body").append(lightboxHtml);
    });

    // Close lightbox
    $(document).on("click", "#close-lightbox", function () {
        $("#portfolio-showcase").remove();
    });

    // Animate skill bars
    $(window).scroll(function () {
        $("#skills .skill-bar").each(function () {
            var position = $(this).offset().top;
            var skillsWindow = $(window).scrollTop() + $(window).height() - 100;
            if (position < skillsWindow) {
                $(this).find(".html-skill").animate({
                    width: "90%",
                }, 1000);
            }
        });
    });

    // Testimonial slider
    var testimonials = $(".testimonial-slide");
    var currentIndex = 0;

    function showTestimonial(index) {
        testimonials.removeClass("opacity-100").addClass("opacity-0");
        $(testimonials[index]).removeClass("opacity-0").addClass("opacity-100");
    }

    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }

    showTestimonial(currentIndex);
    setInterval(nextTestimonial, 5000);

    // Toggle About section
    $("#toggle-about").click(function () {
        $("#more-about").slideToggle();
        var buttonText = $(this).text() === "Read Less" ? "Read More" : "Read Less";
        $(this).text(buttonText);
    });

    // AJAX Form Submission
    $("#contact-form").submit(function (event) {
        event.preventDefault();
        var formData = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "contact.php", // Change this to your server-side script URL
            data: formData,
            success: function (response) {
                $("#response-message").removeClass("hidden").text(response);
                $("#contact-form")[0].reset();
            },
            error: function (error) {
                $("#response-message").removeClass("hidden").text("Error: " + error.statusText);
            },
        });
    });

    // Smooth scrolling to top
    $("footer").click(function () {
        $("html, body").animate({
            scrollTop: 0,
        }, 1000);
    });

    // Parallax scrolling effect
    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        $("#introduction, #portfolio, #skills, #testimonials, #about, #contact").css(
            "background-position", "center " + -(scrollTop / 2) + "px"
        );
    });

    $(".nav-link").click(function(event) {
        event.preventDefault();
        var target = $(this).attr("href");
        $("html, body").animate({
            scrollTop: $(target).offset().top
        }, 1000);
    });
});