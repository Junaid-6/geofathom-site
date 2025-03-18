$(document).ready(function() {
    // Create top navigation bar
    const navbar = $("<div></div>").attr("id", "navbar");
    
    const navItems = ["Home", "About", "Services", "Contact", "Login"];
    const navContainer = $("<div></div>").addClass("nav-container");
    
    navItems.forEach(item => {
        const navLink = $("<a></a>")
            .text(item)
            .attr("href", "store.html")
            .addClass("nav-link");
        navContainer.append(navLink);
    });
    
    navbar.append(navContainer);
    $("body").prepend(navbar);

    const menu = $("#menu");
    menu.addClass("menu");

    // Array of objects with properties
    const items = [
        { name: "Store", color: "white", bgImage: "StoreBTN.png" }, 
        { name: "Pre Release", color: "white", bgImage: "StoreBTN.png" }, 
        { name: "Upcoming Games", color: "white", bgImage: "StoreBTN.png" }
    ];

    // Function to create boxes
    items.forEach(item => {
        const box = $("<div></div>") 
            .text(item.name)
            .addClass("menu-item")
            .css({
                color: item.color,
                backgroundImage: `url(${item.bgImage})`
            })
            .appendTo(menu)
            .animate({ opacity: 1 }, 500); // Fade-in effect
    });
});
