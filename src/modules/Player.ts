import {
  Actor,
  CollisionType,
  Color,
  Engine,
  Input,
  vec,
} from 'excalibur';

import Assets from './Assets';

export class Player extends Actor {
    private jumpForce = 200;
    private jumpTime = 0.25;
    jumpTimeCounter = 0;
    isAirborne = false;
    constructor() {
        super({
            pos: vec(150, 150),
            vel: vec(0, 0),
            width: 32,
            height: 32,
            color: Color.Cyan,
            collisionType: CollisionType.Active,
        });
        this.jumpTimeCounter = this.jumpTime;
    }

    onInitialize() {
        this.graphics.add(Assets.test.toSprite());
        void Assets.test.load()

    }

    public update(engine: Engine, delta: number) {
        // Handle horizontal movement
        const moveSpeed = 200;
        if (engine.input.keyboard.isHeld(Input.Keys.A)) {
            this.vel.x = -moveSpeed;
        } else if (engine.input.keyboard.isHeld(Input.Keys.D)) {
            this.vel.x = moveSpeed;
        } else {
            this.vel.x = 0;
        }

        // Handle jumping
        if (engine.input.keyboard.wasPressed(Input.Keys.Space) && !this.isAirborne) {
            this.isAirborne = true;
            this.jumpTimeCounter = this.jumpTime;
            this.vel.y = -this.jumpForce;
        }

        if (engine.input.keyboard.isHeld(Input.Keys.Space) && this.isAirborne) {
            if (this.jumpTimeCounter > 0) {
                this.vel.y = -this.jumpForce;
                this.jumpTimeCounter -= delta / 1000;
            } else {
                this.isAirborne = false;
            }
        }

        if (engine.input.keyboard.wasReleased(Input.Keys.Space)) {
            this.isAirborne = false;
        }
    }
}