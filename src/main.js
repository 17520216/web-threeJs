console.log("Testing");
const content = document.querySelector(".content span");
console.log("content", content);
const tl = gsap.timeline();
const h1 = document.querySelector("h1");
const p = document.querySelector("p");
// tl.from(content, {cssRule:{scaleX:0}})
tl.to(content, { delay: 0.2, duration: 2, scaleX: "1" });
tl.to(h1, {
  duration: 2,
  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
  y: "30px",
});
tl.to(p, {
  duration: 4,
  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
  y: "30px",
});
