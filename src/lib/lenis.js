// Tiny holder so any component (e.g. the mobile menu) can pause/resume smooth scroll.
let instance = null;
export const setLenis = (lenis) => {
  instance = lenis;
};
export const getLenis = () => instance;