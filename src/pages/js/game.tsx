import React, { useState, useEffect } from 'react';

import { KEY, CUBE_W, CUBE_H } from './const';
// import Audio from "audio";
import Stack from './stack';
import Cube from './cube';
import { Spin } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
// import styles from '../css/app.less';
import '../css/app.less';
import { Col, Row } from 'antd';

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

  const [die, setDie] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cubeState, setCubeState] = useState<any>(undefined);
  const [nextCubeState, setNextCubeState] = useState<any>(undefined);
  const [stackState, setStackState] = useState<any>(undefined);
  const [info, setInfo] = useState<any>(undefined);
  const [apm, setApm] = useState<any>(undefined);
  const [pause, setPause] = useState<any>(false);

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
    console.log('here is updateStack stack:', stack);

    // console.log('this', this);
    // console.log('updateStack', arguments[0]);

    let _info = stack.getInfo();
    // if (!this.state.die && !info.status) {
    //   //this.audio.stopBgm();
    //   //this.audio.playDie();
    // }
    // if (this.state.info && this.state.info.lineCnt < info.lineCnt) {
    //   //this.audio.playDestroy();
    // }
    setStackState(stack.getCurrent());
    setInfo(_info);
    setDie(!_info.status);
    setApm(cube.getApm());

    console.log('stack info', info);
    console.log('updateStack info die', die);
    console.log('!info.status', !_info.status);

    // this.setState({
    //   stack: this.stack.getCurrent(),
    //   info: info,
    //   die: !info.status,
    //   apm: this.cube.getApm(),
    // });
  };

  const handleAction = (e: any) => {
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
      case KEY.PAUSE:
        togglePause();
        break;
      case KEY.SPACE:
        // console.log('KEY.SPACE die', die);

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
    doc.addEventListener('keydown', (e) => {
      handleAction(e);
    });
  };

  useEffect(() => {
    bindEvent();
    stack.onChange(updateStack);
    cube.onChange(updateCube);
    //console.log('here is useEffect stack:',stack);

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
    console.log('here is game start cube:', cube);

    console.log('here is game start stack:', stack);
    cube.clearApmRecord();
    //audio.playReadyGo();
    //audio.playBgm();
    //console.log('here is game start stack:',stack);
    stack.onChange(updateStack);
    cube.onChange(updateCube);

    stack.refresh().start();
    updateStack();
    cube.create().start();
    updateStack();
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
  console.log('here is togglePause cube', cube);
  console.log('here is togglePause cubeState', cubeState);

  var offsetX = 0,
    offsetY = 0,
    transform: any = '';
  if (cubeState) {
    offsetX = cubeState.point[0] * CUBE_W;
    offsetY = cubeState.point[1] * CUBE_H;
    var translate: any = 'translate3d(' + offsetX + 'px, ' + offsetY + 'px, 0)';
    transform = {
      transform: translate,
      '-webkit-transform': translate,
    };
  }

  // console.log(this.state.info && this.state.info.best);
  return (
    <Row>
      <Col span={16} push={2}>
        <div className="t-top">
          <div className="t-info" style={{ display: 'inline-block' }}>
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
          </div>
          <div className="t-info" style={{ display: 'inline-block' }}>
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
        <div className={'tetris' + (die ? ' die' : '')}>
          {/* <div className="t-info-wrapper">
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
      </div> */}

          <div className="t-stack-wrapper">
            <Spin
              spinning={pause}
              indicator={
                <div
                  onClick={() => {
                    togglePause();
                  }}
                  style={{ marginTop: 100, marginLeft: -30 }}
                >
                  <PlayCircleOutlined
                    style={{ fontSize: 55, color: '#2f676f' }}
                  />
                </div>
              }
            >
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
            </Spin>
          </div>
          {/* <div className="t-info-wrapper">
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
      </div> */}

          <div className="t-game-control">
            <a
              href="javascript:;"
              className="t-start"
              style={{ display: die ? 'block' : 'none' }}
              onClick={start}
            >
              START
            </a>
            {/* {!die && (
            <a href="javascript:;" className="t-pause" onClick={togglePause}>
              {pause ? '>' : '||'}
            </a>
          )} */}
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
      </Col>
      <Col span={8} pull={3}>
        <div style={{ height: 100 }} />
        <div>
          <div className="t-introduction-title">操作键说明：</div>
          <ul className="t-introduction-body">
            <li>P键：暂停/继续</li>
            <li>左、右、下键：控制方向</li>
            <li>上键：旋转方块</li>
            <li>空格键：坠底</li>
          </ul>
        </div>
        <div style={{ height: 500 }} />
        <div>
          <div className="t-signature-title">人民当家作组：</div>
          <div className="t-signature-body">
            黄瑞杰、王怡贤、许明远、朱景润、娄钰阁、赵志威
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Game;
