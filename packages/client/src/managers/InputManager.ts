import { Game } from '../Game';
import {Manager} from '../types';

export class InputManager extends Manager {
  private mouseDown: [boolean, boolean];
  public isMoveUpPressed = false;
  public isMoveDownPressed = false;
  public isMoveLeftPressed = false;
  public isMoveRightPressed = false;

  constructor(game: Game) {
    super(game);
    this.mouseDown = [false, false];
  }

  init(): Promise<void> {
    window.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('wheel', this.handleMouseWheel);
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
    
    return Promise.resolve();
  }
  
  destroy(): Promise<void> {
    window.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('wheel', this.handleMouseWheel);
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);

    return Promise.resolve();
  }

  handleMouseWheel = (event: WheelEvent): void => {
    const { deltaY } = event;
    this.game.worldManager.updateScaling(deltaY > 0 ? 0.2 : -0.2);
  }

  handleMouseUp = (event: MouseEvent): void => {
    const { button, pageX, pageY } = event;
    this.mouseDown[button] = false;
  }

  handleMouseDown = (event: MouseEvent): void => {
    const { button, pageX, pageY } = event;
    this.mouseDown[button] = true;
  }

  handleMouseMove = (event: MouseEvent): void => {
    const { movementX, movementY } = event;
    if (this.mouseDown[0]) {
      const deltaX = this.game.worldManager.toWorldDistance(movementX);
      const deltaY = this.game.worldManager.toWorldDistance(movementY);
      
      this.game.cameraManager.moveCamera(deltaX, deltaY);
    }
  }

  handleKeyDown = (event: KeyboardEvent): void => {
    const { code } = event;
    
    switch (code) {
      case 'KeyW': {
        this.isMoveUpPressed = true;
        break;
      }
      case 'KeyS': {
        this.isMoveDownPressed = true;
        break;
      }
      case 'KeyA': {
        this.isMoveLeftPressed = true;
        break;
      }
      case 'KeyD': {
        this.isMoveRightPressed = true;
        break;
      }
    }
  }

  handleKeyUp = (event: KeyboardEvent): void => {
    const { code } = event;
    
    switch (code) {
      case 'KeyW': {
        this.isMoveUpPressed = false;
        break;
      }
      case 'KeyS': {
        this.isMoveDownPressed = false;
        break;
      }
      case 'KeyA': {
        this.isMoveLeftPressed = false;
        break;
      }
      case 'KeyD': {
        this.isMoveRightPressed = false;
        break;
      }
    }
  }
}