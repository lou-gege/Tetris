import Stack from './stack';
import Cube from './cube';
jest.mock('./stack');

beforeEach(() => {
  Stack.mockClear();
});

test('test cube left', () => {
  const stack = new Stack();
  const cube = new Cube(stack);
  cube.create();
  const pointOld = cube.point;
  cube.status = true;
  cube.left();
  expect(cube.point[0]).toBe(pointOld[0] - 1);
  expect(cube.point[1]).toBe(pointOld[1]);
});

test('test cube right', () => {
  const stack = new Stack();
  const cube = new Cube(stack);
  cube.create();
  const pointOld = cube.point;
  cube.status = true;
  cube.right();
  expect(cube.point[0]).toBe(pointOld[0] + 1);
  expect(cube.point[1]).toBe(pointOld[1]);
});

test('test cube fall', () => {
  const stack = new Stack();
  const cube = new Cube(stack);
  cube.create();
  const pointOld = cube.point;
  cube.status = true;
  cube.fall();
  expect(cube.point[0]).toBe(pointOld[0]);
  expect(cube.point[1]).toBe(pointOld[1] + 1);
});

test('test cube spin', () => {
  const stack = new Stack();
  const cube = new Cube(stack);
  cube.create();
  cube.status = true;
  const oldState = cube.state;
  cube.spin();
  expect(cube.state).toBe((oldState + 1) % 4);
});

test('test hasCollision called when cube move', () => {
  const stack = new Stack();
  const cube = new Cube(stack);
  cube.create();
  cube.status = true;
  cube.left();
  cube.right();
  cube.fall();

  const mockStackInstance = Stack.mock.instances[0];
  const mockHasCollision = mockStackInstance.hasCollision;
  expect(mockHasCollision).toHaveBeenCalledTimes(3);
});

test('test apm', () => {
  const stack = new Stack();
  const cube = new Cube(stack);
  const start = new Date('2021-12-17T03:24:00');
  const end = new Date('2021-12-17T03:26:00');
  const cnt = 10;
  for (let i = 0; i < cnt; i++) {
    cube.create();
  }
  cube.playTime = end.valueOf() - start.valueOf();
  expect(cube.getApm()).toBe(Math.round(cnt / (cube.playTime / 60 / 1000)));
});
