import { useState } from "react";
import { useEffect } from "react";
import FallingStarPoint from "./FallingStarPoint";

const length = 16;

function FallingStar(props) {
    const [dimension, updateDimention] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    useEffect(() => {
        window.addEventListener("resize", () => {
            updateDimention({
                width: window.innerWidth,
                height: window.innerHeight
            });
        })
        updateDimention({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }, []);

    function initPos() {
        if (dimension) {
            return { x: Math.random() * dimension.width, y: Math.random() * dimension.height, dx: 0, ddx: 1 }
        } else {
            return { x: 0, y: 0, dx: 0, ddx: 1, rdx: 0, rdy: 0 };
        }
    }

    function initAllPos() {
        let poses = [];
        for (let i = 0; i < length; i++) {
            poses.push(initPos());
        }
        return poses;
    }

    const [pos, setPos] = useState(initAllPos());

    function initPoints() {
        const pts = [];
        for (let i = 0; i < length; i++) {
            pts.push(
                <FallingStarPoint key={i} index={i} pos={pos} />
            );
        }
        return pts;
    }

    const points = initPoints();

    const max_x = 3;
    const min_x = 1;
    const speed = (Math.random() * .1) + .02
    useEffect(() => {
        const interval = setInterval(() => {
            let newPos = initAllPos();
            for (let i = 1; i < length; i++) {
                newPos[i] = pos[i - 1];
            }

            let ddx = pos[0].ddx;
            let dx = pos[0].dx + speed * ddx;
            if (dx > max_x) {
                dx = max_x;
                ddx = -1;
            }
            if (dx < min_x) {
                dx = min_x;
                ddx = 1;
            }

            let rdx = dx;
            let rdy = 2;
            newPos[0] = {
                dx,
                ddx,
                rdx,
                rdy,
                x: pos[0].x + rdx,
                y: pos[0].y + rdy
            }

            let lastPos = newPos[newPos.length - 1];
            if (lastPos.x > dimension.width + 5) {
                newPos[0].x = -5;
                newPos[0].y = Math.random() * dimension.height;
            }
            if (lastPos.y > dimension.height + 5) {
                newPos[0].y = -5;
                newPos[0].x = Math.random() * dimension.width;
            }
            if (lastPos.x < -5) {
                newPos[0].x = dimension.width + 5;
                newPos[0].y = Math.random() * dimension.height;
            }
            if (lastPos.y < -5) {
                newPos[0].y = dimension.height + 5;
                newPos[0].x = Math.random() * dimension.width;
            }
            setPos(newPos);
        }, 30);
        return () => clearInterval(interval);
    })

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            top: 0,
            left: 0,
            position: "fixed",
            opacity: .7
        }}>
            {points}
        </div>
    );
}

export default FallingStar;