document.addEventListener("DOMContentLoaded", () => {
    

    const observerOptions = {
        root: null, 
        rootMargin: "0px",
        threshold: 0.1 
    };
   
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            
            if (entry.isIntersecting) {
               
                entry.target.classList.add("show");
                
              
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
   
    const hiddenElements = document.querySelectorAll(".hidden");

    hiddenElements.forEach(element => {
        observer.observe(element);
    });

});

