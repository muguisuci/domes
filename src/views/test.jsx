import React, { useCallback } from "react";
import Captcha from "react-captcha-code";

export const Basic = () => {
  const handleClick = useCallback((captcha) => {
    console.log("captcha:", captcha);
  }, []);

  return (
    <div>
      <Captcha charNum={4} onChange={handleClick} />
      <h1>测试git</h1>
    </div>
  );
};

export default Basic;
