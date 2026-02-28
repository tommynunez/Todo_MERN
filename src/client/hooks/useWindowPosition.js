import { useLayoutEffect, useState } from "react";

//component found on: https://www.youtube.com/watch?v=rK0Lz8x7npA&t=893s&ab_channel=DailyWebCoding
export default function useWindowPosition(id) {
  const [animation, setAnimation] = useState(false);

  useLayoutEffect(() => {
    //
    function updatePosition() {
      const offSetHeight = window.document.getElementById(id).offsetHeight;
      if (window.pageYOffset > offSetHeight * 0.7) {
        setAnimation(true);
      }
    }

    window.addEventListener("scroll", updatePosition);
    updatePosition();

    return () => window.removeEventListener("scroll", updatePosition);
  }, [id]);
  return animation;
}
