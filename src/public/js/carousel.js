// const carousel = document.querySelector(".carousel");
// let carouselItems = document.querySelectorAll(".carousel__item");
// const [btnLeftCarousel, btnRightCarousel] = document.querySelectorAll(
//   ".carousel-button"
// );
// let carouselCount = carouselItems.length;
// let pos = 0;
// let translateX = 0;

// btnLeftCarousel.addEventListener("click", (e) => {
//   let calculate = pos > 0 ? (pos - 1) % carouselCount : carouselCount;
//   if (pos > 0) translateX = pos === 1 ? 0 : translateX - 100.5;
//   else if (pos <= 0) {
//     translateX = 100.5 * (carouselCount - 1);
//     calculate = carouselCount - 1;
//   }

//   console.log(pos);

//   pos = slide({
//     show: calculate,
//     disable: pos,
//     translateX: translateX,
//   });
// });

// btnRightCarousel.addEventListener("click", (e) => {
//   let calculate = (pos + 1) % carouselCount;
//   if (pos >= carouselCount - 1) {
//     calculate = 0;
//     translateX = 0;
//   } else {
//     translateX += 100.5;
//   }

//   pos = slide({
//     show: calculate,
//     disable: pos,
//     translateX: translateX,
//   });
// });

// function slide(options) {
//   function active(_pos) {
//     carouselItems[_pos].classList.toggle("active");
//   }

//   function inactive(_pos) {
//     carouselItems[_pos].classList.toggle("active");
//   }

//   inactive(options.disable);
//   active(options.show);

//   document.querySelectorAll(".carousel__item").forEach((item, index) => {
//     if (index === options.show) {
//       item.style.transform = `translateX(-${options.translateX}%) scale(1)`;
//     } else {
//       item.style.transform = `translateX(-${options.translateX}%) scale(0.9)`;
//     }
//   });

//   return options.show;
// }

var slidePosition = 1;
SlideShow(slidePosition);

// forward/Back controls
function plusSlides(n) {
  SlideShow((slidePosition += n));
}

//  images controls
function currentSlide(n) {
  SlideShow((slidePosition = n));
}

function SlideShow(n) {
  var i;
  var slides = document.getElementsByClassName("Containers");
  if (n > slides.length) {
    slidePosition = 1;
  }
  if (n < 1) {
    slidePosition = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  // for (i = 0; i < circles.length; i++) {
  //   circles[i].className = circles[i].className.replace(" enable", "");
  // }
  slides[slidePosition - 1].style.display = "block";
}

// var slidePosition = 0;
Automate();

function Automate() {
  var i;
  var slides = document.getElementsByClassName("Containers");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slidePosition++;
  if (slidePosition > slides.length) {
    slidePosition = 1;
  }
  slides[slidePosition - 1].style.display = "block";
  setTimeout(Automate, 4000); // Change image every 2 seconds
}

var x = document.getElementById("toast");

if (x) {
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 5000);
}
