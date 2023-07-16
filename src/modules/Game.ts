import {
  Actor,
  CollisionType,
  Color,
  Engine,
  Physics,
  Polygon,
  PolygonCollider,
  vec,
} from 'excalibur';

import { Player } from './Player';

class Game extends Engine {
    player: Player | null = null;
    constructor(canvasRef: HTMLCanvasElement) {
        // its not even a react hook and im not in a .tsx, stupid fucking eslint
        // eslint-disable-next-line react-hooks/rules-of-hooks
        Physics.useRealisticPhysics();
        Physics.gravity = vec(0, 700);
        Physics.bodiesCanSleepByDefault = true;
        super({
            canvasElement: canvasRef,
            backgroundColor: Color.Black,
            width: document.body.clientWidth,
            height: document.body.clientHeight,
        });
    }

    initialize() {
        const ground = new Actor({
            pos: vec(this.halfDrawWidth, this.drawHeight),
            width: document.body.clientWidth * 5,
            height: 100,
            color: Color.Red,
            collisionType: CollisionType.Fixed
        });

        const box = new Actor({
            pos: vec(100, 100),
            width: 50,
            height: 50,
            rotation: Math.PI / 3,
            color: Color.Red,
            collisionType: CollisionType.Active
        });

        const trianglePoints = [vec(-20, 20), vec(0, -20), vec(20, 20)];
        const triangle = new Actor({
            pos: vec(this.halfDrawWidth, 100),
            rotation: Math.PI / 3,
            collider: new PolygonCollider({ points: trianglePoints }),
            collisionType: CollisionType.Active
        });
        const triangleGraphic = new Polygon({ points: trianglePoints, color: Color.Green });
        triangle.graphics.use(triangleGraphic);

        const circle = new Actor({
            pos: vec(this.halfDrawWidth + 20, -200),
            radius: 30,
            color: Color.Yellow,
            collisionType: CollisionType.Active
        });

        void this.start().then(() => {
            this.currentScene.add(box);
            this.currentScene.add(circle);
            this.currentScene.add(triangle);
            this.currentScene.add(ground);
            this.currentScene.camera.strategy.lockToActor(this.player!)
            this.currentScene.camera.zoom = 2;
        })
    }

    addPlayer(player: Player): void {
        this.player = player;
        this.player.body.useGravity = true;
        this.add(this.player);

    }
}


export default Game;