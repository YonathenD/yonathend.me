import * as THREE from "three";
import { Mesh } from "three";

import Experience from "../Experience.js";

import GSAP from "gsap";

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;

        console.log(this.actualRoom);

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        }
        
        this.setModel();
        this.onMouseMove();
    }

    //For every solid within my glb model cast a shadow
    setModel() {
        this.actualRoom.children.forEach(child=>{
            child.castShadow = true;
            child.receiveShadow = true;
            
            if (child instanceof THREE.Group) {
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }
        })
        this.scene.add(this.actualRoom);
    }

    //The room rotates wherever the cursor goes
    onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            this.rotation = ((e.clientX - window.innerWidth / 2) * 2)/window.innerWidth;
            this.lerp.target = this.rotation * 0.7;
        });
    }

    resize() {
        
    }

    //Update the frame to give my room a looking side to side affect when following the cursor
    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );
        this.actualRoom.rotation.y = this.lerp.current;
    }

}