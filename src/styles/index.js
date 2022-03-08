import { createGlobalStyle } from "styled-components/macro";
// import { copy } from './copy';
import { ContentWrapper, PageWrapper, PageContainer } from "./layout";

const GlobalStyle = createGlobalStyle`
*,
*::after,
*::before {
    box-sizing: border-box;
}


#root {
  height: 100%
}

  body {
    height: 100vh;
    margin: 0;
    padding:0;
     background-color: #110e0e;
      box-sizing: border-box;
          width: 100vw;
     position: relative
  }

  img {
 -webkit-user-drag: none;
 -khtml-user-drag: none;
 -moz-user-drag: none;
 -o-user-drag: none;
 user-drag: none;
  opacity: 0;

}

a {
  text-decoration: none;

}


// canvas for ghost
.vis {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}



/**/
  #stage {
      position: fixed;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100vh;

      pointer-events: none;
  }


  .slideshow {
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 17vh 0;
    pointer-events: none;

}

.slideshow__inner {
    width: 100%;
    max-width: 520px;


}

.slide {
     overflow: hidden;
    width: 100%;
    height: 100%;
    margin-bottom: 15%;

    h3 {
        opacity: 0;
        user-select: none;

     }

    img {
        display: block;
        width: 100%;
        height: 100%;

        object-fit: cover;

        opacity: 0;
        user-select: none;

     }


}


.title-wrap {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;

    //mix-blend-mode: difference;
}

.title {
     font-weight: 900;
    text-transform: uppercase;
    font-size: 3vw;
    line-height: 0.9;
    color: white;
    cursor: pointer;
     -webkit-touch-callout: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    letter-spacing: 27px;
}


/* Split
--------------------------------------------------------- */

.split {
    display: inline-block;
    overflow: hidden;

    &:nth-child(1) {
        transform: translate3d(1ch, -50%, 0);
    }

    &:nth-child(2) {
        transform: translate3d(-1ch, 50%, 0);
    }
}

.split__text {
    display: block;
}

.main-canvas {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

::selection {
    color: none;
    background: none;
}
/* For Mozilla Firefox */
::-moz-selection {
    color: none;
    background: none;
}


.cursor{
    box-sizing: border-box;
    width: 60px;
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 999999;
    transform-origin: 50%;
    transform: translate3d(-50% , -50% , 0);
  & > div{
    mix-blend-mode: exclusion;
  }
  .cursor-follow{
    transform-origin: 50%;
  }
  svg{
    display: block;
    fill: none;
    stroke: #ffffff;
    stroke-width: 0.8;
    stroke-miterlimit: miter;
  }
}

///////// =====>

.main {
  margin-top: 2rem;
  width: 100%;
  margin: 5rem auto;
  max-width: 65rem;
}

.container {
  position: relative;
}

.heading {
  font-size: 2rem;
  text-transform: uppercase;
  margin-bottom: 2rem;
  z-index: 10;

  @media screen and (min-width: 650px) {
    position: absolute;
    left: 0;
    top: 6rem;
  }
}

mark {
  color: #FFF;
  background-color: #000;
  line-height: 1.35;
  padding: .325rem;
}

img {
  display: block;
  width: 100%;
}

.grid-container {
  max-width: 65rem;
  margin: 0 auto;
  padding: 0 10%;
}

.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  position: relative;
  grid-template-rows: repeat(12, 1fr);
}

.grid__item--bg {
  grid-column: 2 / span 9;
  z-index: 0;
  grid-row: 1 / -1;
}

.grid__item--portrait-half {
  grid-column: 6 / span 6;
  z-index: 2;
  grid-row: 1 / -1;
/*   clip-path: polygon(5% 10%, 27% 3%, 94% 25%, 84% 98%, 39% 98%, 11% 98%, 4% 66%, 4% 34%); */
}

.grid__item--portrait-neck {
/*   clip-path: polygon(5% 3%, 96% 4%, 95% 95%, 6% 95%, 20% 30%); */
  grid-column: 5 / span 4;
  grid-row: 6 / 11;
  z-index: 3;
}

.grid__item--portrait-left {
/*   clip-path: polygon(10% 19%, 93% 15%, 90% 88%, 13% 92%); */
  grid-column: 2 / span 4;
  grid-row: 6 / 12;
  z-index: 4;
}

.grid__item--portrait-eye {
/*   clip-path: polygon(4% 13%, 84% 12%, 86% 34%, 80% 45%, 80% 76%, 10% 79%); */
  grid-column: 4 / span 2;
  grid-row: 3 / 5;
  z-index: 5;
  width: 82%;
  justify-self: end
}

.grid__item--portrait-shirt {
/*   clip-path: polygon(3% 2%, 50% 25%, 97% 8%, 97% 97%, 3% 98%); */
  grid-column: 1 / span 2;
  grid-row: 11 / -1;
  z-index: 6;
}

.grid__item--portrait-bg-1 {
/*   clip-path: polygon(14% 13%, 84% 12%, 86% 34%, 90% 66%, 30% 76%, 10% 79%); */
  grid-column: 1 / span 2;
  grid-row: 1 / 4;
  z-index: 8;
}

.grid__item--portrait-bg-2 {
/*   clip-path: polygon(9% 4%, 80% 0%, 100% 100%, 0% 100%); */
  grid-column: 11 / -1;
  grid-row: 2 / 7;
  z-index: 8;
}

.grid__item--portrait-bg-3 {
/*   clip-path: polygon(9% 4%, 80% 0%, 100% 100%, 0% 100%); */
  grid-column: 1 / span 3;
  grid-row: 4 / 7;
  z-index: 4;
}

.grid__item--portrait-bg-4 {
/*   clip-path: polygon(5% 4%, 94% 3%, 97% 96%, 13% 96%); */
  grid-column: 10 / 12;
  grid-row: 1 / 6;
  z-index: 1;
}

////

/*! locomotive-scroll v4.1.1 | MIT License | https://github.com/locomotivemtl/locomotive-scroll */
html.has-scroll-smooth {
  overflow: hidden; }

html.has-scroll-dragging {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none; }

.has-scroll-smooth body {
  overflow: hidden; }

.has-scroll-smooth [data-scroll-container] {
  min-height: 100vh; }

[data-scroll-direction="horizontal"] [data-scroll-container] {
  height: 100vh;
  display: inline-block;
  white-space: nowrap; }

[data-scroll-direction="horizontal"] [data-scroll-section] {
  display: inline-block;
  vertical-align: top;
  white-space: nowrap;
  height: 100%; }

.c-scrollbar {
  position: absolute;
  right: 0;
  top: 0;
  width: 11px;
  height: 100%;
  transform-origin: center right;
  transition: transform 0.3s, opacity 0.3s;
  opacity: 0; }
  .c-scrollbar:hover {
    transform: scaleX(1.45); }
  .c-scrollbar:hover, .has-scroll-scrolling .c-scrollbar, .has-scroll-dragging .c-scrollbar {
    opacity: 1; }
  [data-scroll-direction="horizontal"] .c-scrollbar {
    width: 100%;
    height: 10px;
    top: auto;
    bottom: 0;
    transform: scaleY(1); }
    [data-scroll-direction="horizontal"] .c-scrollbar:hover {
      transform: scaleY(1.3); }

.c-scrollbar_thumb {
  position: absolute;
  top: 0;
  right: 0;
  background-color: black;
  opacity: 0.5;
  width: 7px;
  border-radius: 10px;
  margin: 2px;
  cursor: -webkit-grab;
  cursor: grab; }
  .has-scroll-dragging .c-scrollbar_thumb {
    cursor: -webkit-grabbing;
    cursor: grabbing; }
  [data-scroll-direction="horizontal"] .c-scrollbar_thumb {
    right: auto;
    bottom: 0; }







    .dropdown {
      position: relative;
       margin: 0 auto;
 text-align: left
    }

    .dropdown__text {
     color: white;
     padding: 10px 16px;
      cursor: pointer;
    height: auto;
    }

    .dropdown__text:hover {
      color: white;
     }

    .dropdown__text:after {
      content: "";
      transition: all .3s;
     float: right;
    margin-top: 8px;
    margin-right: 6px;
      padding: 5px;
      transform: rotate(-135deg);

    }

    .dropdown.active .dropdown__text:after {
    margin-top:1px;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);

    }

    .dropdown__items {
     position: relative;
    visibility: hidden;
    opacity: 0;
     max-height: 0px;
     transition: max-height 0.6s ease;
    }


    .dropdown.active .dropdown__items {
     visibility: visible;

     height: auto;
     max-height: 290px;
      opacity: 1;
     transition: max-height 0.7s, opacity 3s, visibility 4s ease;



    }

    .dropdown__item {
      cursor: pointer;
     padding: 5px 18px;color: #707070
    }




    .dropdown__item:hover {
    color: white;
     }
`;

export { GlobalStyle, ContentWrapper, PageWrapper, PageContainer };
