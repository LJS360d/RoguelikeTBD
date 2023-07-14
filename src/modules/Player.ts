import {
  Actor,
  CollisionType,
  Color,
  DegreeOfFreedom,
  Engine,
  Input,
  vec,
} from 'excalibur';

import Assets from './Assets';

type Direction = "up" | "down" | "left" | "right" | "up-right" | "up-left" | "down-right" | "down-left";
export class Player extends Actor {
    private jumpTime = 0.25;
    jumpTimeCounter = 0;
    isAirborne = false;
    facing: Direction = "right";
    keysHeld: Input.Keys[] = [];
    private readonly jumpForce = 300;
    private readonly moveForce: number = 300;
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
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);
        this.body.useGravity = true;
    }

    onInitialize() {
        this.graphics.add(Assets.player.toSprite());
        void Assets.player.load()

    }

    public update(engine: Engine, delta: number) {
        super.update(engine, delta);

        const keyboard = engine.input.keyboard;
        const keysHeld = keyboard.getKeys();
        this.keysHeld = keysHeld;

        this.facing = getDirection(keysHeld);
        this.handleMovement(keysHeld);
        this.handleJumping(keyboard, delta);
        // Handle dashing
        if (keyboard.wasPressed(Input.Keys.Numpad0)) {
            this.dash();
        }
    }
    private handleMovement(keysHeld: Input.Keys[]) {
        if (keysHeld.length > 0) {
            if (this.facing === "right" && keysHeld.includes(Input.Keys.D))
                this.vel.x = this.moveForce;
            if (this.facing === "left" && keysHeld.includes(Input.Keys.A))
                this.vel.x = -this.moveForce;
            /* if (this.facing === "up" && keysHeld.includes(Input.Keys.W))
                this.vel.y = -this.moveForce; */
            if (this.facing === "down" && keysHeld.includes(Input.Keys.S))
                this.vel.y = this.moveForce;

        } else {
            this.vel.x = 0;
        }
    }
    private handleJumping(keyboard: Input.Keyboard, delta: number) {
        if (keyboard.wasPressed(Input.Keys.Space) && !this.isAirborne) {
            this.isAirborne = true;
            this.jumpTimeCounter = this.jumpTime;
            this.vel.y = -this.jumpForce;
        }

        if (keyboard.isHeld(Input.Keys.Space) && this.isAirborne) {
            if (this.jumpTimeCounter > 0) {
                this.vel.y = -this.jumpForce;
                this.jumpTimeCounter -= delta / 1000;
            } else {
                this.isAirborne = false;
            }
        }

        if (keyboard.wasReleased(Input.Keys.Space)) {
            this.isAirborne = false;
        }
    }
    private dash() {
        //TODO
    }
}

function getDirection(keysHeld: Input.Keys[]): Direction {
    if (keysHeld.includes(Input.Keys.D) && keysHeld.includes(Input.Keys.W))
        return "up-right";

    if (keysHeld.includes(Input.Keys.A) && keysHeld.includes(Input.Keys.W))
        return "up-left";

    if (keysHeld.includes(Input.Keys.D) && keysHeld.includes(Input.Keys.S))
        return "up-left";

    if (keysHeld.includes(Input.Keys.A) && keysHeld.includes(Input.Keys.S))
        return "down-left";

    if (keysHeld.includes(Input.Keys.A))
        return "left";

    if (keysHeld.includes(Input.Keys.W))
        return "up";

    if (keysHeld.includes(Input.Keys.S))
        return "down";

    return "right";
}