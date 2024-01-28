import React from "react";
//引入
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
// import { LockOutlined, UserOutlined } from "@ant-design/icons";
// import { Button, Checkbox, Form, Input, message } from "antd";

//组件的最外层
const particlesInit = async (main) => {
  await loadFull(main);
};

//粒子被正确加载到画布中时，这个函数被调用
const particlesLoaded = (container) => {
  console.log("123", container);
};

export default function Bgparticle() {
  //粒子参数
  const options = {
    background: {
      position: "50% 50%",
      repeat: "no-repeat",
      size: "cover",
    },
    // 帧数，越低越卡,默认60
    fpsLimit: 120,
    fullScreen: {
      zIndex: 1,
    },
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: ["grab"],
        },
      },
      modes: {
        push: {
          //点击是添加1个粒子
          quantity: 1,
        },
        bubble: {
          distance: 200,
          duration: 2,
          opacity: 0.8,
          size: 20,
          divs: {
            distance: 200,
            duration: 0.4,
            mix: false,
            selectors: [],
          },
        },
        grab: {
          distance: 100,
        },
        //击退
        repulse: {
          divs: {
            //鼠标移动时排斥粒子的距离
            distance: 0,
            //翻译是持续时间
            duration: 0.4,
            factor: 100,
            speed: 1,
            maxSpeed: 50,
            easing: "ease-out-quad",
            selectors: [],
          },
        },
        //缓慢移动
        slow: {
          //移动速度
          factor: 2,
          //影响范围
          radius: 200,
        },
        //吸引
        attract: {
          distance: 0,
          duration: 0.4,
          easing: "ease-out-quad",
          factor: 3,
          maxSpeed: 50,
          speed: 1,
        },
      },
    },
    //  粒子的参数
    particles: {
      //粒子的颜色
      color: {
        value: "#ffffff",
      },
      //是否启动粒子碰撞
      collisions: {
        enable: true,
      },
      //粒子之间的线的参数
      links: {
        color: {
          value: "#ffffff",
        },
        distance: 150,
        enable: true,
        warp: true,
      },
      move: {
        attract: {
          rotate: {
            x: 600,
            y: 1200,
          },
        },
        enable: true,
        outModes: {
          bottom: "out",
          left: "out",
          right: "out",
          top: "out",
        },
        speed: 2,
        warp: true,
      },
      number: {
        density: {
          enable: true,
        },
        //初始粒子数
        value: 100,
      },
      //透明度
      opacity: {
        value: 0.5,
        animation: {
          speed: 3,
          minimumValue: 0.1,
        },
      },
      //大小
      size: {
        random: {
          enable: true,
        },
        value: {
          min: 1,
          max: 3,
        },
        animation: {
          speed: 20,
          minimumValue: 0.1,
        },
      },
    },
  };
  return (
    <div style={{ height: "100%", overflow: "hidden" }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={options}
      />
    </div>
  );
}
