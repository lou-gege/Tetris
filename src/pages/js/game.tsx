import React, { useState, useEffect } from 'react';

import { KEY, CUBE_W, CUBE_H } from './const';
// import Audio from "audio";
import Stack from './stack';
import Cube from './cube';

// import styles from '../css/app.less';
import '../css/app.less';

var doc = document;

let stackShouldUpdate = 0;
let cubeShouldUpdate = 0;

export const stackUpdate = () => {
  console.log('hhh');
  stackShouldUpdate++;
  console.log('555');
};
export const cubeUpdate = () => {
  cubeShouldUpdate++;
};

const Game: React.FC = () => {
  // getInitialState() {
  //   this.stack = new Stack();
  //   this.cube = new Cube(this.stack);
  //   return {
  //     die: true,
  //     //audio: true,
  //     isMobile: false,
  //   };
  // }

  // let stack = new Stack();
  // let cube = new Cube(stack);

  const [die, setDie] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [cubeState, setCubeState] = useState(undefined);
  const [nextCubeState, setNextCubeState] = useState(undefined);
  const [stackState, setStackState] = useState(undefined);
  const [info, setInfo] = useState(undefined);
  const [apm, setApm] = useState(undefined);
  const [pause, setPause] = useState(undefined);

  const [stack, setStack] = useState(new Stack());
  const [cube, setCube] = useState(new Cube(stack));

  console.log('stack', stack);
  console.log('cube', cube);
  console.log('stack.status', stack.status);
  console.log('stackShouldUpdate', stackShouldUpdate);
  console.log('cubeState', cubeState);

  // constructor() {
  //   super();
  //   this.stack = new Stack();
  //   this.cube = new Cube(this.stack);

  //   this.state = {
  //     die: true,
  //     isMobile: false,
  //   };
  // }

  // useEffect(() => {
  //   if (stackShouldUpdate) {
  //     console.log('111');
  //     updateStack();
  //     console.log('222');
  //   }
  // }, [stackShouldUpdate]);

  // useEffect(() => {
  //   if (cubeShouldUpdate) {
  //     // console.log('111');
  //     updateCube();
  //   }
  // }, [cubeShouldUpdate]);

  // useEffect(() => {
  //   updateStack();
  // }, [stack]);

  // useEffect(() => {
  //   updateCube();
  // }, [cube]);

  const updateCube = () => {
    console.log('updateCube', cube);

    setCubeState(cube.getCurrent());
    setNextCubeState(cube.getNext());

    // this.setState({
    //   cube: this.cube.getCurrent(),
    //   nextCube: this.cube.getNext(),
    // });
  };

  const updateStack = () => {
    console.log('updateStack');

    // console.log('this', this);
    // console.log('updateStack', arguments[0]);

    let info = stack.getInfo();
    // if (!this.state.die && !info.status) {
    //   //this.audio.stopBgm();
    //   //this.audio.playDie();
    // }
    // if (this.state.info && this.state.info.lineCnt < info.lineCnt) {
    //   //this.audio.playDestroy();
    // }
    setStackState(stack.getCurrent());
    setInfo(info);
    setDie(!info.status);
    setApm(cube.getApm());

    // this.setState({
    //   stack: this.stack.getCurrent(),
    //   info: info,
    //   die: !info.status,
    //   apm: this.cube.getApm(),
    // });
  };

  const handleAction = (e) => {
    console.log('handleAction e', e);
    switch (e.keyCode) {
      case KEY.LEFT:
        cube.left();
        //audio.playBtn();
        break;
      case KEY.RIGHT:
        cube.right();
        //audio.playBtn();
        break;
      case KEY.UP:
        cube.spin();
        //audio.playSpin();
        break;
      case KEY.DOWN:
        cube.fall();
        break;
      case KEY.SPACE:
        if (die) {
          start();
        } else {
          cube.bottom();
          //audio.playBottom();
        }
        break;
    }
  };

  const bindEvent = () => {
    // if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
    //   setIsMobile(true);
    //   // this.setState({ isMobile: true });
    //   var shadow = (ele) => {
    //     ele.classList.add('active');
    //     setTimeout(() => ele.classList.remove('active'), 100);
    //   };
    //   setTimeout(() => {
    //     FastClick.attach(this.refs.cubeControl);
    //     this.refs.space.addEventListener('touchend', (e) => {
    //       shadow(this.refs.space);
    //       this.handleAction(KEY.SPACE);
    //     });
    //     this.refs.up.addEventListener('touchend', (e) => {
    //       shadow(this.refs.up);
    //       this.handleAction(KEY.UP);
    //     });
    //     this.refs.down.addEventListener('touchend', (e) => {
    //       shadow(this.refs.down);
    //       this.handleAction(KEY.DOWN);
    //     });
    //     this.refs.left.addEventListener('touchend', (e) => {
    //       shadow(this.refs.left);
    //       this.handleAction(KEY.LEFT);
    //     });
    //     this.refs.right.addEventListener('touchend', (e) => {
    //       shadow(this.refs.right);
    //       this.handleAction(KEY.RIGHT);
    //     });
    //   }, 500);
    // }

    doc.addEventListener('keydown', (e) => {
      handleAction(e);
    });
  };

  useEffect(() => {
    bindEvent();
    stack.onChange(updateStack);
    cube.onChange(updateCube);

    updateStack();
  }, []);

  // componentDidMount() {
  //   this.bindEvent();
  //   this.stack.onChange(this.updateStack);
  //   this.cube.onChange(this.updateCube);
  //   //this.audio = new Audio();

  //   this.updateStack();
  // }

  const start = () => {
    cube.clearApmRecord();
    //audio.playReadyGo();
    //audio.playBgm();
    stack.refresh().start();
    updateStack();
    cube.create().start();
  };

  // toggleAudio() {
  //   var isMute = this.state.audio;
  //   isMute ? this.audio.mute() : this.audio.unmute();
  //   !this.state.die && this.audio.playBgm();
  //   this.setState({audio: !isMute});
  // },
  const togglePause = () => {
    cube.toggleStatus();
    setPause(!cube.status);
    // this.setState({ pause: !this.cube.status });
  };

  var offsetX = 0,
    offsetY = 0,
    transform = '';
  if (cubeState) {
    offsetX = cubeState.point[0] * CUBE_W;
    offsetY = cubeState.point[1] * CUBE_H;
    var translate = 'translate3d(' + offsetX + 'px, ' + offsetY + 'px, 0)';
    transform = {
      transform: translate,
      '-webkit-transform': translate,
    };
  }

  // console.log(this.state.info && this.state.info.best);
  return (
    <div className={'tetris' + (die ? ' die' : '')}>
      <div className="t-stack-wrapper">
        <div className="t-stack">
          {cubeState && (
            <ins className="t-cube" style={transform}>
              {cubeState.shape.map((line) => (
                <i className="t-cube-line">
                  {line.map((c) => (
                    <i className={'t-cube-c c' + c}></i>
                  ))}
                </i>
              ))}
            </ins>
          )}
          {stackState &&
            stackState.map((line) => (
              <i className="t-stack-line">
                {line.map((c) => (
                  <i className={'t-stack-c c' + c}></i>
                ))}
              </i>
            ))}
        </div>
      </div>
      <div className="t-info-wrapper">
        <div className="t-info">
          <h3>NEXT</h3>
          <div className="t-info-box">
            <ins className="t-cube">
              {nextCubeState &&
                nextCubeState.shape.map((line) => (
                  <i className="t-cube-line">
                    {line.map((c) => (
                      <i className={'t-cube-c c' + c}></i>
                    ))}
                  </i>
                ))}
            </ins>
          </div>
          <h3>SCORE</h3>
          <div className="t-info-box">
            {info && (
              <ul className="t-info-score">
                <li>Lv{info.level}</li>
                <li>
                  <span className="v">{info.score}</span>
                  <br />
                  APM: {apm || 0}
                </li>
                <li>
                  <br />
                  Best
                </li>
                <li>
                  <span className="v">{info.best.score || 0}</span>
                  <br />
                  APM: {info.best.apm || 0}
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="t-game-control">
        <a
          href="javascript:;"
          className="t-start"
          style={{ display: die ? 'block' : 'none' }}
          onClick={start}
        >
          START
        </a>
        {!die && (
          <a href="javascript:;" className="t-pause" onClick={togglePause}>
            {pause ? '>' : '||'}
          </a>
        )}
        {/* <a href="javascript:;"
          className={"t-audio" + (this.state.audio ? "" : " disabled")}
          onClick={this.toggleAudio}>
          ♪
        </a> */}
      </div>

      {isMobile && (
        <div className="t-cube-control" ref="cubeControl">
          <a href="javascript:;" className="t-space" ref="space"></a>
          <a href="javascript:;" className="t-up" ref="up"></a>
          <a href="javascript:;" className="t-right" ref="right"></a>
          <a href="javascript:;" className="t-down" ref="down"></a>
          <a href="javascript:;" className="t-left" ref="left"></a>
        </div>
      )}
    </div>
  );
};

export default Game;
