try {
  const react = require('react');
  console.log('react: found');
} catch(e) {
  console.log('react: NOT FOUND');
}
try {
  const next = require('next');
  console.log('next: found');
} catch(e) {
  console.log('next: NOT FOUND');
}
try {
  const three = require('three');
  console.log('three: found');
} catch(e) {
  console.log('three: NOT FOUND');
}
try {
  const anime = require('animejs');
  console.log('animejs: found');
} catch(e) {
  console.log('animejs: NOT FOUND');
}
try {
  const gsap = require('gsap');
  console.log('gsap: found');
} catch(e) {
  console.log('gsap: NOT FOUND');
}
