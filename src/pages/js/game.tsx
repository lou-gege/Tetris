import React, { useState, useEffect } from 'react';

import { KEY, CUBE_W, CUBE_H } from './const';
import Stack from './stack';
import Cube from './cube';
import { Spin } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import '../css/app.less';
import { Col, Row } from 'antd';

const doc = document;

const Game: React.FC = () => {
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

  const updateCube = () => {
    setCubeState(cube.getCurrent());
    setNextCubeState(cube.getNext());
    console.log('here is cubeState', cubeState);
  };

  const updateStack = () => {
    let _info = stack.getInfo();
    setStackState(stack.getCurrent());
    setInfo(_info);
    setDie(!_info.status);
    setApm(cube.getApm());
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
        if (die) {
          start();
        } else {
          cube.bottom();
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
    updateStack();
  }, []);

  const start = () => {
    cube.clearApmRecord();
    stack.refresh().start();
    updateStack();
    cube.create().start();
    updateStack();
  };

  const togglePause = () => {
    cube.toggleStatus();
    setPause(!cube.status);
  };

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

  return (
    <Row>
      <Col span={16} push={2}>
        <div className="t-top">
          <div className="t-info" style={{ display: 'inline-block' }}>
            <h3>NEXT</h3>
            <div className="t-info-box">
              <ins className="t-cube">
                {nextCubeState &&
                  nextCubeState.shape.map((line, index) => (
                    <i className="t-cube-line" key={index + 'cubeLine'}>
                      {line.map((c, index) => (
                        <i
                          className={'t-cube-c c' + c}
                          key={index + 'cubeC'}
                        ></i>
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
                    style={{ fontSize: 55, color: 'rgb(38, 80, 130)' }}
                  />
                </div>
              }
            >
              <div className="t-stack">
                {cubeState && (
                  <ins className="t-cube" style={transform}>
                    {cubeState.shape.map((line, index) => (
                      <i className="t-cube-line" key={'cubeLine' + index}>
                        {line.map((c, index) => (
                          <i
                            className={'t-cube-c c' + c}
                            key={'tCubeC' + index}
                          ></i>
                        ))}
                      </i>
                    ))}
                  </ins>
                )}
                {stackState &&
                  stackState.map((line, index) => (
                    <i className="t-stack-line" key={'stackLine' + index}>
                      {line.map((c, index) => (
                        <i
                          className={'t-stack-c c' + c}
                          key={'stackC' + index}
                        ></i>
                      ))}
                    </i>
                  ))}
              </div>
            </Spin>
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
          <div className="t-introduction-title">人民当家作组：</div>
          <div className="t-introduction-body">
            黄瑞杰、王怡贤、许明远、朱景润、娄钰阁、赵志威
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Game;
